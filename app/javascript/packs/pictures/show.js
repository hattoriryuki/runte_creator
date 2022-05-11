document.addEventListener('DOMContentLoaded',()=> {
  document.write( "<%= image_tag 'data:image/png;base64,' + @picture.image, class: 'lg:w-2/6 md:w-3/6 w-5/6 mb-5 object-cover object-center rounded' %>" );
});