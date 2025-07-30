
document.getElementById('emailForm').addEventListener('submit', async function (e) {
  e.preventDefault();
  const email = e.target.email.value.trim();
  const response = await fetch('/api/validate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email })
  });
  if (response.status === 200) {
    const data = await response.json();
    window.location.href = data.redirect;
  } else {
    alert('Access denied. Your email is not authorized.');
  }
});
