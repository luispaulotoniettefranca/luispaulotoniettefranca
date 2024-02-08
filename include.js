let includes = document.querySelectorAll('include');
for (let include of includes) {
    let filename = include.attributes.src.value;
    fetch(filename)
        .then(response => response.text())
        .then(content => include.insertAdjacentHTML('afterend', content))
        .then(_ => include.remove());
}