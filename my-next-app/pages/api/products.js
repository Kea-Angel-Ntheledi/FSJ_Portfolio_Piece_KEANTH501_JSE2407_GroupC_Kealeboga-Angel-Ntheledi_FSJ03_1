import { db } from '@/firebase'; // Assuming you're using Firebase Firestore

export default async function handler(req, res) {
  try {
    const { search, category, sort, page = 1, limit = 20 } = req.query;

    let productsQuery = db.collection('products'); // Adjust if using a different Firebase structure

    // Search by title
    if (search) {
      productsQuery = productsQuery.where('title', '>=', search).where('title', '<=', search + '\uf8ff');
    }

    // Filter by category
    if (category) {
      productsQuery = productsQuery.where('category', '==', category);
    }

    // Sort by price
    if (sort) {
      const [sortField, sortDirection] = sort.split('_');
      if (sortField === 'price') {
        productsQuery = productsQuery.orderBy('price', sortDirection === 'asc' ? 'asc' : 'desc');
      }
    }

    // Pagination logic
    const productsSnapshot = await productsQuery
      .offset((page - 1) * limit)
      .limit(limit)
      .get();

    const products = productsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching products' });
  }
}
