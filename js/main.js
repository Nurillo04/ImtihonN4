let elBtnLogout = document.querySelector('.btn-logout');
let elBtnAdmin = document.querySelector('.btn-admin');
let elCards = document.querySelector('.cards');
let elSearch = document.querySelector('#search');
let elBookList = document.querySelector('.list');
let elCard = document.querySelector('.card');
let elSum = document.querySelector('.result');




fetch("https://www.googleapis.com/books/v1/volumes?q=search+terms=java&startIndex=1")
    .then((res) => res.json())
    .then((data) => {
        console.log(data.items);
        renderData(data.items)
    })






var Bookmarks = [];

elCards.addEventListener('click', (evt) => {
    elmodal.innerHTML = `
    <div class="d-flex justify-content-center my-1">
                <div class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
    </div>
    `;
    const target = evt.target;

    if (target.className.includes('btn-More')) {
        const id = target.dataset.id;

        BookArray.forEach(element => {
            if (id == element.id) {
                elmodalTitle.textContent = element.volumeInfo.title;
                elmodal.innerHTML = `
                        <img class="modal-img mx-auto d-block" src="${element.volumeInfo.imageLinks ? element.volumeInfo.imageLinks.smallThumbnail : '/images/Group193.svg'}" alt="book-img">
                        <p class="modal-description">${element.volumeInfo.description}</p>
                        <ul class="modal-list">
                            <li class="modal-item">Author : <span> ${typeof (element.volumeInfo.authors) == "object" ? element.volumeInfo.authors[0] : 'Muallif aniqlanmagan!'}</span></li>
                            <li class="modal-item">Published : <span> ${element.volumeInfo.publishedDate.substring(0, 4)}</span></li>
                            <li class="modal-item">Publishers: <span> ${element.volumeInfo.publisher}</span></li>
                            <li class="modal-item">Categories: <span> ${typeof (element.volumeInfo.categories) == "object" ? element.volumeInfo.categories[0] : 'kategoriya aniqlanmagan'}</span></li>
                            <li class="modal-item">Pages Count: <span> ${element.volumeInfo.pageCount}</span></li>
                        </ul>
                        `
                elmodalfooter.innerHTML = `
                        <a class="w-25 me-4" href="${element.volumeInfo.previewLink}">
                           <button class="btn m-2 btn-Read">Read</button>
                        </a>
                        `
            }
        })
    }

    if (target.className.includes('btn-Bookmark')) {
        const id = target.dataset.id;

        BookArray.forEach(element => {
            if (id == element.id) {
                Bookmarks.push(element);
            }
            console.log(Bookmarks)
            renderBookmark(Bookmarks);
        })

    }

})


elBookList.addEventListener('click', (evt) => {

    const target = evt.target;
    if (target.className.includes('btn-delet')) {
        const id = target.dataset.id;

        let deletArray = [];
        Bookmarks.forEach(element => {
            if (element.id !== id) {
                deletArray.push(element)
            }
        });
        Bookmarks = deletArray;
        renderBookmark(Bookmarks);

    }
})



elBookList.addEventListener('click', (evt) => {

    const target = evt.target;
    if (target.className.includes('btn-delet')) {
        const id = target.dataset.id;

        let deletArray = [];
        Bookmarks.forEach(element => {
            if (element.id !== id) {
                deletArray.push(element)
            }
        });
        Bookmarks = deletArray;
        renderBookmark(Bookmarks);

    }
})


elSearch.addEventListener('change', () => {

    let value = elSearch.value;
    console.log(elSearch.value);


    fetch(`https://www.googleapis.com/books/v1/volumes?q=search+terms=${value}`)
        .then((res) => res.json())
        .then((data) => {
            console.log(data.items);
            renderData(data.items)
        })
    elSearch.value = '';
})

elBtnLogout.addEventListener('click', () => {
    window.location.href = 'login.html';
    localStorage.removeItem('token')
})

elBtnAdmin.addEventListener('click', () => {
    if (token && token != typeof undefined) {
        window.location.href = 'admin.html';
    }
})


elBtnOrder.addEventListener('click', () => {
    fetch("https://www.googleapis.com/books/v1/volumes?q=flowers&orderBy=newest")
        .then((res) => res.json())
        .then((data) => {
            console.log(data.items);
            renderData(data.items)
        })

})