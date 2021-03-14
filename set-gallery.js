import images from "./gallery-items.js";


const refs = {
    body: document.querySelector('body'),
    galleryEl: document.querySelector('.js-gallery'),
    modal: document.querySelector('.lightbox'),
    overlay: document.querySelector('.lightbox__overlay'),
    imageOrigin: document.querySelector('.lightbox__image'),
    btnCloseModal: document.querySelector('button[data-action="close-lightbox"]')
};


let currentInd

const galleryCard = createGalleryImgCardMarkUp(images);
refs.galleryEl.insertAdjacentHTML('beforeend', galleryCard);

refs.galleryEl.addEventListener('click', onClickImgPreview)

function createGalleryImgCardMarkUp (images) {
    return images
        .map(({ preview, original, description }, index) => {
        return `
        <li class="gallery__item">
            <a
                class="gallery__link"
                href="${original}"
            >
                <img
                    class="gallery__image"
                    src="${preview}"
                    data-source="${original}"
                    data-index="${index}"
                    alt="${description}"
                />
            </a>
        </li>`
    }).join('')
}

function onClickImgPreview(e) {
    e.preventDefault();
    if (!e.target.classList.contains('gallery__image')) {
        return;
    };
    let image = e.target;
    currentInd = +image.dataset.index;

    isOpenModal();
    addImageModalData(image);

}

function isOpenModal () {
    refs.modal.classList.add('is-open');

    refs.btnCloseModal.addEventListener('click', onCloseModal);
    refs.overlay.addEventListener('click', onCloseModalOverlay);
    window.addEventListener('keydown', onCloseModalClickEsc);
    window.addEventListener('keydown', onClickArrow);
}

function onCloseModal () {
    refs.modal.classList.remove('is-open');
    removeImageModalData();
    window.removeEventListener('keydown', onCloseModalClickEsc);
    window.removeEventListener('keydown', onClickArrow);
}

function onCloseModalOverlay (e) {
    if (e.currentTarget === e.target) {
        onCloseModal()
    }
}

function onCloseModalClickEsc (e) {
    if (e.code === "Escape") {
        onCloseModal()
    }
}

function addImageModalData (image) {
    refs.imageOrigin.src = image.dataset.source;
    refs.imageOrigin.alt = image.alt;
}

function removeImageModalData() {
    refs.imageOrigin.src = '';
    refs.imageOrigin.alt = '';
}

function onClickArrow (e) {
    if (e.code === "ArrowRight" && currentInd < images.length - 1) {
        currentInd += 1;
        return setImageModalDataClickArrow(currentInd);
    }
    if (e.code === "ArrowLeft" && currentInd > 0) {
        currentInd -= 1;
        return setImageModalDataClickArrow(currentInd);
    }
    if (e.code === "ArrowRight" && currentInd === images.length - 1) {
            currentInd = 0;
            setImageModalDataClickArrow(currentInd);
    }
    if (e.code === "ArrowLeft" && currentInd === 0) {
        currentInd = images.length - 1;
        setImageModalDataClickArrow(currentInd);
    }
}

function setImageModalDataClickArrow(i) {
    refs.imageOrigin.src = images[i].original;
    refs.imageOrigin.alt = images[i].description;
}

