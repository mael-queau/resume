let typeElements = document.querySelectorAll('.type');

window.addEventListener('scroll', appearAll);

colorSections();
setTimeout(appearAll, 100);

function appearAll() {
  typeElements.forEach((e, i) => {
    if (!e.disp && isInViewport(e)) {
      e.disp = true;
      setTimeout(() => {
        appear(e);
      }, 700);
    }
  });
}

function appear(elem) {
  if (elem.tagName == "IMG" || elem.tagName == "INPUT") {
    appearImg(elem);
    return;
  }
  elem.classList.add('typing');
  let original = elem.innerHTML;
  let regex = /( *class=".*" *)|( *id=".*" *)/g;
  let typingPosition = 1;
  let typedHTML = elem.classList.contains('comment') ? elem.innerText.substring(2) : elem.outerHTML;
  typedHTML = typedHTML.replace(regex, "").replace(/<br>/g, " ");
  let typingInterval = setInterval(() => {
    elem.style.opacity = 1;
    if (typingPosition > typedHTML.length) {
      clearInterval(typingInterval);
      setTimeout(() => {
        elem.classList.remove('typing');
        elem.innerHTML = original;
      }, 500);
    } else {
      elem.innerHTML = typedHTML.substring(0, typingPosition++).replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\//g, "&sol;");
    }
  }, Math.floor(Math.random() * 20 + 10));
}

function appearImg(elem) {
  let type = document.createElement('span');
  if (elem.classList.contains("right"));
  type.classList.add("right");
  type.classList.add("typing");
  elem.parentNode.insertBefore(type, elem);
  elem.style.display = "none";

  let regex = /( *class=".*" *)|( *id=".*" *)/g;
  let typingPosition = 1;
  let typedHTML = elem.outerHTML;
  typedHTML = typedHTML.replace(regex, "");
  let typingInterval = setInterval(() => {
    elem.style.opacity = 1;
    if (typingPosition > typedHTML.length) {
      clearInterval(typingInterval);
      setTimeout(() => {
        type.remove();
        elem.style.display = "initial";
      }, 500);
    } else {
      type.innerHTML = typedHTML.substring(0, typingPosition++).replace("<", "&lt;").replace(">", "&gt;").replace("/", "&sol;");
    }
  }, Math.floor(Math.random() * 20 + 10));
}

function colorSections() {
  let sections = document.querySelectorAll('.sec');
  for (let i = 1; i < sections.length; i++) {
    let transp = 1 - (i / sections.length) * .6;
    sections[i].style.backgroundColor = `rgba(38, 51, 71, ${transp})`;
  }
}

function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.bottom >= 0 && rect.top <= (window.innerHeight || document.documentElement.clientHeight)
  );
}
