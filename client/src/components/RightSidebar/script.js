document.addEventListener('DOMContentLoaded', () => {
    const widgetHeader = document.getElementById('widget-header');
    const widgetContent = document.getElementById('widget-content');
    const tagsHeader = document.getElementById('tags-header');
    const tagsContent = document.getElementById('tags-content');
  
    const widgetTexts = [
      { title: 'Blog 1', content: 'This is the first blog post content.' },
      { title: 'Blog 2', content: 'This is the second blog post content.' },
      { title: 'Blog 3', content: 'This is the third blog post content.' },
    ];
  
    const tagsTexts = [
      ['JavaScript', 'CSS', 'HTML'],
      ['React', 'Redux', 'Node.js'],
      ['MongoDB', 'Express', 'Angular'],
    ];
  
    let currentIndex = 0;
  
    const updateContent = () => {
      widgetHeader.textContent = widgetTexts[currentIndex].title;
      widgetContent.textContent = widgetTexts[currentIndex].content;
      tagsContent.innerHTML = '';
      tagsTexts[currentIndex].forEach(tag => {
        const tagElement = document.createElement('p');
        tagElement.textContent = tag;
        tagsContent.appendChild(tagElement);
      });
  
      currentIndex = (currentIndex + 1) % widgetTexts.length;
    };
  
    setInterval(updateContent, 3000);
    updateContent();
  });
  