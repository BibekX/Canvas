/**
 * How to Set Up
 */

/**
 * Create a new ColorPicker instance, which takes 2 parameters
 *
 * Parameter 1 [HTMLElement]: the button you want to launch the editor
 * Parameter 2 [String] (Optional): A color
 */

const button = document.getElementById("picker_launcher");
let picker = new ColorPicker(button, "#4c0082");

/**
 * What do you want to do after you have chosen the color?
 *
 * You can specify this in an EventListener, assigned to your button
 */

button.addEventListener("colorChange", function (event) {
  // This will give you the color you selected
  const color = event.detail.color.hexa;

  console.log(color);

  // Change the color of the background
  document.getElementsByTagName("BODY")[0].style.background = color;
});

/**
 * IGNORE THIS FOR SETUP
 * This is just some code specific to the codepen
 * to open the picker when someone loads in
 */

colorPickerComp.instance = button.colorPickerObj;
colorPickerComp.updateColorDisplays("#4c0082");
