
/*
// Ödemeleri kategori ismi ile birlikte getiren endpoint
app.get('/api/payments', async (req, res) => {
  const { data, error } = await supabase
    .from('student_payments')
    .select('total_amount, paid_amount, payment_categories(name)')
    .order('category_id');

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  // response'u sadeleştir
  const result = data.map(item => ({
    category_name: item.payment_categories.name,
    total_amount: item.total_amount,
    paid_amount: item.paid_amount
  }));

  res.json(result);
});

*/

app.get('/api/payments/:student_id', async (req, res) => {
  const studentId = req.params.student_id;

  const { data, error } = await supabase
    .from('student_payments')
    .select('total_amount, paid_amount, payment_categories(name)')
    .eq('student_id', studentId)
    .order('category_id');

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  const result = data.map(item => ({
    category_name: item.payment_categories.name,
    total_amount: item.total_amount,
    paid_amount: item.paid_amount
  }));

  res.json(result);
});
