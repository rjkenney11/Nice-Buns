
// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
    $(".change-yum").on("click", function(event) {
    
      var id = $(this).data("id");
      let choice = $('[name="devoured"]:checked').val();

      if (choice === 1) {
        var newDevoured = 0
        
      }else{
        var newDevoured = 1
      } 
      
      var newBebbanburger = {
        devoured: newDevoured
      };
  
      // Send the PUT request.
      $.ajax("/api/burgers/" + id, {
        type: "PUT",
        data: newBebbanburger
      }).then(
        function() {
          console.log("changed burger to", newDevoured);
          // Reload the page to get the updated list
          location.reload();
        }
      );
    });
  
    $(".create-form").on("submit", function(event) {
      // Make sure to preventDefault on a submit event.
      event.preventDefault();

      var newBurger = {
        burger_name: $("#newBurger").val().trim(),
        devoured: $('[name="devoured"]:checked').val()
      };
      console.log("my new burger is", newBurger)
      console.log("is the burger eaten ", newBurger.devoured)
  
      // Send the POST request.
      $.ajax("/api/burgers", {
        type: "POST",
        data: newBurger
      }).then(
        function() {
          console.log("created new burger");
          // Reload the page to get the updated list
          location.reload();
        }
      );
    });
  
    $(".delete-yum").on("click", function(event) {
      var id = $(this).data("id");
  
      // Send the DELETE request.
      $.ajax("/api/burgers/" + id, {
        type: "DELETE"
      }).then(
        function() {
          console.log("deleted burger", id);
          // Reload the page to get the updated list
          location.reload();
        }
      );
    });
  });
  