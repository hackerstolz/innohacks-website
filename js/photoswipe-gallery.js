var items = [
    '/assets/gallery/innohacks16_01.jpg',
    '/assets/gallery/innohacks16_02.jpg',
    '/assets/gallery/innohacks16_03.jpg',
    '/assets/gallery/innohacks16_04.jpg',
    '/assets/gallery/innohacks16_05.jpg',
    '/assets/gallery/innohacks16_06.jpg',
    '/assets/gallery/innohacks16_07.jpg',
    '/assets/gallery/innohacks16_08.jpg',
    '/assets/gallery/innohacks16_09.jpg',
    '/assets/gallery/innohacks16_10.jpg',
    '/assets/gallery/innohacks16_11.jpg',
    '/assets/gallery/innohacks16_12.jpg',
    '/assets/gallery/innohacks16_13.jpg',
    '/assets/gallery/innohacks16_14.jpg',
    '/assets/gallery/innohacks16_15.jpg'
];
var galleryItems = [];
var thumbnailContainer = document.querySelectorAll('.photo-thumbnails')[0];


function openPhotoSwipe(index) {
    // exit if index not found
    if(isNaN(index)) {
        return;
    }
    
    options = {
        index: parseInt(index, 10),
        getThumbBoundsFn: function(index) {
            var thumbnail = thumbnailContainer.getElementsByTagName('img')[index];
                pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
                rect = thumbnail.getBoundingClientRect(); 

            return {x:rect.left, y:rect.top + pageYScroll, w:rect.width};
        }
    };

    /* Initializes photoswipe gallery and fills with selected pictures */
    var pswpElement = document.querySelectorAll('.pswp')[0];
    var gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, galleryItems, options);
    gallery.init();
};

function onThumbnailClicked(e) {
    e = e || window.event;
    e.preventDefault ? e.preventDefault() : e.returnValue = false;

    var eTarget = e.target || e.srcElement;

    var index = this.getAttribute('data-pswp-uid');
    if (index >= 0) {
        openPhotoSwipe(index);
    }
    return false;
}


/* Create thumbnails for hackathon images */
for (var id in items) {
    var url = items[id];
    var item = {
        src: url,
        w: 1440,
        h: 960
    };
    galleryItems.push(item);

    var element = thumbnailContainer.appendChild(document.createElement("figure"));
    element.setAttribute('itemprop', 'associatedMedia');
    element.setAttribute('itemscope', '1');
    element.setAttribute('itemtype', 'http://schema.org/ImageObject');
    element.setAttribute('data-pswp-uid', id);
    element.onclick = onThumbnailClicked;
    var anchor = element.appendChild(document.createElement("a"));
    anchor.setAttribute('itemprop', 'contentUrl');
    anchor.setAttribute('data-size', '1440x960');
    anchor.setAttribute('href', url);
    var image = anchor.appendChild(document.createElement("img"));
    image.setAttribute('itemprop', 'thumbnail');
    image.setAttribute('src', url);
}
