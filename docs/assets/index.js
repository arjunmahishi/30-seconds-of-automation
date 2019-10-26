const fetchSnippets = async () => {
  const fetchResponse = await fetch('assets/snippets.json');
  const parsedResponse = await fetchResponse.json();

  const container = document.getElementById('snippetsContainer');
  parsedResponse.forEach(snippet => {
    container.innerHTML += `
      <li>${snippet.name}</li>
    `;
  });
};

fetchSnippets();