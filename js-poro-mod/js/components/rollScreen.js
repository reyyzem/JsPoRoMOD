import { sanitizeNumberInput, clampNumber } from "../utils/numberInput.js";
import rollScreen from "../../layouts/rollScreen.html"; // Make sure the path is correct
import { showToast } from "../utils/showToast.js";
import { Rarities } from "../constants/rarities";
import hackInstance from "../actions/hack"; // Import the instance instead of the class

export function loadRollScreen() {
    document.getElementById("rollScreen").innerHTML = rollScreen;

    const luckInput = document.getElementById("luckInput");
    if (luckInput) {
        luckInput.dataset.min = -Math.pow(2, 31);
        luckInput.dataset.max = Math.pow(2, 31) - 1;
        luckInput.value = luckInput.dataset.max; // Set default value to max
    }

    const moneyInput = document.getElementById("moneyInput");
    if (moneyInput) {
        moneyInput.dataset.min = -Number.MAX_SAFE_INTEGER;
        moneyInput.dataset.max = Number.MAX_SAFE_INTEGER;
        moneyInput.value = moneyInput.dataset.max; // Set default value to max
    }

    const rollCountInput = document.getElementById("rollCountInput");
    if (rollCountInput) {
        rollCountInput.dataset.min = -Math.pow(2, 31);
        rollCountInput.dataset.max = Math.pow(2, 31) - 1;
        rollCountInput.value = rollCountInput.dataset.max; // Set default value to max
    }

    const itemTierSelect = document.getElementById("itemTierSelect");
    for (var key in Rarities) {
        var option = document.createElement("option");
        option.value = Rarities[key];
        option.innerText = key;
        itemTierSelect.appendChild(option);
    }

    const checkboxes = document.querySelectorAll(".toggle-checkbox");
    checkboxes.forEach((checkbox) => {
        checkbox.checked = true; // Enable all checkboxes
    });

    function validateAndClamp(inputElement) {
        const sanitizedValue = sanitizeNumberInput(inputElement.value);
        inputElement.value = sanitizedValue;
        const min = parseInt(inputElement.dataset.min, 10);
        const max = parseInt(inputElement.dataset.max, 10);
        inputElement.value = clampNumber(
            parseInt(inputElement.value, 10),
            min,
            max
        );
    }

    function handleNumberInput(event) {
        const inputElement = event.target;
        const validChars = "0123456789-,.";
        if (
            !validChars.includes(event.key) &&
            !event.ctrlKey &&
            !event.metaKey
        ) {
            event.preventDefault();
        }
    }

    luckInput.addEventListener("input", () => validateAndClamp(luckInput));
    luckInput.addEventListener("keydown", handleNumberInput);

    moneyInput.addEventListener("input", () => validateAndClamp(moneyInput));
    moneyInput.addEventListener("keydown", handleNumberInput);

    rollCountInput.addEventListener("input", () =>
        validateAndClamp(rollCountInput)
    );
    rollCountInput.addEventListener("keydown", handleNumberInput);

    document
        .getElementById("setLuckButton")
        .addEventListener("click", function () {
            this.blur();
            const luck = parseInt(sanitizeNumberInput(luckInput.value), 10);
            hackInstance.setTeamLuck(luck);
        });

    document
        .getElementById("setMoneyButton")
        .addEventListener("click", function () {
            this.blur();
            const money = parseInt(sanitizeNumberInput(moneyInput.value), 10);
            hackInstance.setMoney(money);
        });

    document
        .getElementById("setRollCountButton")
        .addEventListener("click", function () {
            this.blur();
            const rollCount = parseInt(
                sanitizeNumberInput(rollCountInput.value),
                10
            );
            hackInstance.setRollCount(rollCount);
        });

    document
        .getElementById("rollActionButton")
        .addEventListener("click", async function () {
            this.blur();
            const button = document.getElementById("rollActionButton");
            button.disabled = true; // Disable the button when clicked

            try {
                const luck = parseInt(sanitizeNumberInput(luckInput.value), 10);
                const money = parseInt(
                    sanitizeNumberInput(moneyInput.value),
                    10
                );
                const rollCount = parseInt(
                    sanitizeNumberInput(rollCountInput.value),
                    10
                );
                const itemTier = parseInt(
                    document.getElementById("itemTierSelect").value
                );

                const itemTierChecked =
                    document.getElementById("itemTierCheckbox").checked;
                const lockChecked =
                    document.getElementById("lockShopToggle").checked;
                const moneyChecked =
                    document.getElementById("moneyCheckbox").checked;
                const rollChecked =
                    document.getElementById("rollCountCheckbox").checked;
                const luckChecked =
                    document.getElementById("luckCheckbox").checked;

                await hackInstance.roll(
                    itemTierChecked ? itemTier : null, // Rarities[itemTier]
                    lockChecked,
                    moneyChecked ? money : null,
                    rollChecked ? rollCount : null,
                    luckChecked ? luck : null
                );

                // If the command runs to the end without an error, keep the button locked for 2 more seconds
                setTimeout(() => {
                    button.disabled = false;
                }, 1250);
            } catch (error) {
                // If an error occurs, re-enable the button instantly
                console.error(error);
                button.disabled = false;
            }
        });

    const lockShopToggle = document.getElementById("lockShopToggle");
    lockShopToggle.addEventListener("change", () => {
        const lockShop = lockShopToggle.checked;
        hackInstance.setLockRarities(lockShop);
        showToast(`${lockShop ? "Locked" : "Unlocked"} Shop! `);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    loadRollScreen(); // Ensure the roll screen is loaded when the DOM is ready
});
