$("#stroke-width-btn").click(() => {
  $("#stroke-width").toggle("slow");
});

let strokeWidth = $("#stroke-width").val();

$("#stroke-width").change(() => {
  strokeWidth = $("#stroke-width").val();
});
