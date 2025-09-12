function navigateToPage(location) {
    // Redirect to the new page
    window.location.href = location;
}

function resetRows(){
    const rowsContainer = document.getElementById("rows_container");
    rowsContainer.innerHTML = "";
    document.getElementById("num_rows").value = ""; //Change value to empty string 
    const generateBtn = document.getElementById("generate_btn");
    generateBtn.style.display = "none"; // Dont show the generate button
}

function generateRows() {
    const generateBtn = document.getElementById("generate_btn");
    generateBtn.style.display = "block"; // Show the generate button
    const numRows = parseInt(document.getElementById("num_rows").value, 10); // Parse input as an integer
    const rowsContainer = document.getElementById("rows_container");

    // Validate input
    if (isNaN(numRows) || numRows <= 0) {
        alert("Please enter a valid number of rows.");
        return;
    }

    // Clear any existing content
    rowsContainer.innerHTML = "";

    // Generate rows dynamically
    for (let i = 1; i <= numRows; i++) {
        const rowDiv = document.createElement("div");
        rowDiv.classList.add("row");

        // Row Label
        const rowLabel = document.createElement("label");
        rowLabel.textContent = `ROW ${i}`;
        rowDiv.appendChild(rowLabel);

        // Input-Dropdown Container
        const inputDropdownContainerChain = document.createElement("div");
        inputDropdownContainerChain.classList.add("input-dropdown-container");

        // Chain Input
        const chainLabel = document.createElement("label");
        chainLabel.textContent = "Chain:";
        inputDropdownContainerChain.appendChild(chainLabel);

        const chainInput = document.createElement("input");
        chainInput.type = "number";
        chainInput.name = `chain_row_${i}`;
        chainInput.size = 1;
        chainInput.min = 1;
        inputDropdownContainerChain.appendChild(chainInput);

        rowDiv.appendChild(inputDropdownContainerChain);


        // Input-Dropdown Container
        const inputDropdownContainer = document.createElement("div");
        inputDropdownContainer.classList.add("input-dropdown-container");

        // Dropdown
        const dropdown = document.createElement("select");
        dropdown.innerHTML = `
            <option value="dc">dc</option>
            <option value="dc2tog">dc2tog</option>
            <option value="dtr">dtr</option>
            <option value="inc">inc</option>
            <option value="sc">sc</option>
            <option value="sc2tog">sc2tog</option>
            <option value="slst">slst</option>
            <option value="tr">tr</option>
            <option value="tr2tog">tr2tog</option>
        `;
        inputDropdownContainer.appendChild(dropdown);

        // Stitch Input
        const numStitch = document.createElement("input");
        numStitch.type = "number";
        numStitch.name = `num_stitch_row_${i}`;
        numStitch.size = 1;
        numStitch.min = 1;
        inputDropdownContainer.appendChild(numStitch);

        // Append the input-dropdown container to the row
        rowDiv.appendChild(inputDropdownContainer);

        // Button Container
        const buttonContainer = document.createElement("div");
        buttonContainer.classList.add("button-container");

        // Add "plus" button
        const plusBtn = document.createElement("button");
        plusBtn.textContent = "+";
        plusBtn.type = "button"; // Prevent form submission
        plusBtn.onclick = () => addToRow(rowDiv, i); // Pass the row index to the function
        buttonContainer.appendChild(plusBtn);

        // Add "minus" button
        const minusBtn = document.createElement("button");
        minusBtn.textContent = "-";
        minusBtn.type = "button"; // Prevent form submission
        minusBtn.onclick = () => removeFromRow(rowDiv); // Pass the row div to the function
        buttonContainer.appendChild(minusBtn);

        // Add repeat label and input
        const repeatLabel = document.createElement("label");
        repeatLabel.textContent = "Repeat for:";
        buttonContainer.appendChild(repeatLabel);

        const repeatInput = document.createElement("input");
        repeatInput.type = "number";
        repeatInput.name = `repeat_row_${i}`;
        repeatInput.size = 1;
        repeatInput.min = 1;
        buttonContainer.appendChild(repeatInput);

        // Append the button container to the row
        rowDiv.appendChild(buttonContainer);

        // Append the row to the container
        rowsContainer.appendChild(rowDiv);
    }
}

// Function to add more elements to a row
function addToRow(rowDiv, rowIndex) {
    // Create a container for the dropdown and input
    const inputDropdownContainer = document.createElement("div");
    inputDropdownContainer.classList.add("input-dropdown-container");

    // Dropdown
    const dropdown = document.createElement("select");
    dropdown.innerHTML = `
        <option value="dc">dc</option>
        <option value="dc2tog">dc2tog</option>
        <option value="dtr">dtr</option>
        <option value="inc">inc</option>
        <option value="sc">sc</option>
        <option value="sc2tog">sc2tog</option>
        <option value="slst">slst</option>
        <option value="tr">tr</option>
        <option value="tr2tog">tr2tog</option>
    `;
    inputDropdownContainer.appendChild(dropdown);

    // Stitch Input
    const numStitch = document.createElement("input");
    numStitch.type = "number";
    numStitch.name = `num_stitch_row_${rowIndex}`;
    numStitch.size = 1;
    numStitch.min = 1;
    inputDropdownContainer.appendChild(numStitch);

    // Insert the container before the button container
    rowDiv.insertBefore(inputDropdownContainer, rowDiv.querySelector(".button-container"));
}

function removeFromRow(rowDiv) {
    // Find all input-dropdown-container elements in the row
    const containers = rowDiv.querySelectorAll(".input-dropdown-container");
    if (containers.length > 0) {
        // Get the last container
        const lastContainer = containers[containers.length - 1];
        // Remove the last container
        rowDiv.removeChild(lastContainer);
    }
}