window.addEventListener('load', solve);

function solve() {
    const inputs = {
        firstName: document.getElementById('first-name'),
        lastName: document.getElementById('last-name'),
        fromDate: document.getElementById('from-date'),
        toDate: document.getElementById('to-date'),
    };

    const nextBtn = document.getElementById('next-btn');
    nextBtn.addEventListener('click', onNextClick);

    const infoList = document.querySelector('.info-list');
    const confirmList = document.querySelector('.confirm-list');
    const output = document.getElementById('status');

    function onNextClick(event) {
        event.preventDefault();

        if (
            inputs.firstName.value == '' ||
            inputs.lastName.value == '' ||
            inputs.fromDate.value == '' ||
            inputs.toDate.value == ''
        ) {
            return;
        }

        const firstName = inputs.firstName.value;
        const lastName = inputs.lastName.value;
        const fromDate = inputs.fromDate.value;
        const toDate = inputs.toDate.value;


        if ((new Date(fromDate)).getTime() >= (new Date(toDate)).getTime()) {
            return;
        }

        nextBtn.parentElement.reset();
        nextBtn.disabled = true;


        const result = createPreview(firstName, lastName, fromDate, toDate);
        infoList.appendChild(result);

    };

    function createPreview(firstName, lastName, fromDate, toDate) {
        const element = createInfo(firstName, lastName, fromDate, toDate);

        const editBtn = e('button', 'Edit');
        editBtn.className = 'edit-btn';
        editBtn.addEventListener('click', () => onEditClick(firstName, lastName, fromDate, toDate));

        const continueBtn = e('button', 'Continue');
        continueBtn.className = 'continue-btn';
        continueBtn.addEventListener('click', () => onContinueClick(firstName, lastName, fromDate, toDate));

        element.appendChild(editBtn);
        element.appendChild(continueBtn);

        return element;
    };

    function e(type, content) {
        const element = document.createElement(type);

        if (content) {
            element.textContent = content;
        }

        return element;
    }

    function createInfo(firstName, lastName, fromDate, toDate) {
        const element = e('li');
        element.className = 'vacation-content';

        const article = e('article');
        article.appendChild(e('h3', `Name: ${firstName} ${lastName}`));
        article.appendChild(e('p', `From date: ${fromDate}`));
        article.appendChild(e('p', `To date: ${toDate}`));

        element.appendChild(article);

        return element;
    };

    function onContinueClick(firstName, lastName, fromDate, toDate) {
        const result = createConfirmation(firstName, lastName, fromDate, toDate);
        confirmList.appendChild(result);
        infoList.textContent = '';
    }

    function onEditClick(firstName, lastName, fromDate, toDate) {

        inputs.firstName.value = firstName;
        inputs.lastName.value = lastName;
        inputs.fromDate.value = fromDate;
        inputs.toDate.value = toDate;

        infoList.textContent = '';
        nextBtn.disabled = false;
    }

    function createConfirmation(firstName, lastName, fromDate, toDate) {
        const element = createInfo(firstName, lastName, fromDate, toDate);

        const confirmBtn = e('button', 'Confirm');
        confirmBtn.className = 'confirm-btn';
        confirmBtn.addEventListener('click', () => onFinishClick(true));

        const cancelBtn = e('button', 'Cancel');
        cancelBtn.className = 'cancel-btn';
        cancelBtn.addEventListener('click', () => onFinishClick(false));

        element.appendChild(confirmBtn);
        element.appendChild(cancelBtn);

        return element;
    };

    function onFinishClick(confirmed) {

        const className = confirmed ? 'vacation-confirmed' : 'vacation-cancelled';
        const text = confirmed ? 'Vacation Requested' : 'Cancelled Vacation';

        output.classList.add(className);
        output.textContent = text;

        confirmList.textContent = '';

        nextBtn.disabled = false;

       output.addEventListener('click', reloadPage);

       function reloadPage() {
        document.location.reload();
       }
    }

}
