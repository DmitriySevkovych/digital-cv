import '../sass/index.sass';

// POC open and close cards aka items
document.querySelectorAll('.project__item').forEach(item => {

    const itemToggler = item.querySelector('.project__item__head__icon');

    itemToggler.addEventListener('click', () => {

        // Open or close the item if toggler is clicked
        item.classList.toggle('is_open');

        // The item should only be printed if it is open. Otherwise just hide it.
        if (item.classList.contains('is_open')) {
            item.classList.remove('print_not')
        } else {
            item.classList.add('print_not')
        }

    });

});
