export class CategoriesView {
    constructor(parentNode, observable) {
        this.parentNode = parentNode;
        this.observable = observable;
        this.parentNode.innerHTML = null;
    }

    show() {
        this.content.innerHTML = null;
        this.observable.categories.forEach(element =>
            this.content.appendChild(this._render(element)),
        );
    }

    _renderControls() {
        let controls = document.createElement("div");
        controls.className = "categoty__controls";
        let textInput = document.createElement("input");
        textInput.setAttribute("type", "text");
        textInput.className = "input-box";
        let buttonInput = document.createElement("button");
        buttonInput.innerText = "Add category";
        buttonInput.className = "input-confirm";
        buttonInput.onclick = () => {
            let category = textInput.value;
            if (!this.observable.includes(category) && category.length > 0) {
                this.observable.push(category);
                this.show();
            }
        }
        controls.appendChild(textInput);
        controls.appendChild(buttonInput);

        return controls;
    }

    render() {
        this.parentNode.innerHTML = null;
        this.parentNode.appendChild(this._renderControls());
        this.content = document.createElement("div");
        this.parentNode.appendChild(this.content);
        this.show();
    }

    _render(category) {
        let accountContainer = document.createElement("div");
        accountContainer.className = "category";
        accountContainer.appendChild(this._renderHeader(category));
        return accountContainer;
    }

    _renderHeader(category) {
        let accountHeader = document.createElement("div");
        accountHeader.className = "category__header";
        let accountDeleter = document.createElement("span");
        accountDeleter.className = "category__delete";
        accountDeleter.onclick = () => {
            this.observable.remove(category);
            this.show();
        };
        accountHeader.appendChild(this._renderAccountName(category));
        accountHeader.appendChild(accountDeleter);
        return accountHeader;
    }

    _renderAccountName(category) {
        let accountName = document.createElement("p");
        accountName.className = "category__name";
        accountName.innerText = `${category }`;
        return accountName;
    }
}