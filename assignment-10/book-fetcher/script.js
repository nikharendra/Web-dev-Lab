
$(document).ready(function () {

    // Step 1: Detect button click
    $("#loadBooksBtn").click(function () {

        // Step 2: Get the search keyword
        const searchTerm = $("#searchInput").val().trim();

        // Step 3: Validate input
        if (searchTerm === "") {
            $("#message").text("Please enter a book topic.");
            $("#bookList").empty();
            return;
        }

        // Step 4: Show loading message
        $("#message").text("Loading books...");
        $("#bookList").empty();

        $("#loadBooksBtn").prop("disabled", true);

        // Step 5: Send AJAX GET request
        $.ajax({

            url: "https://openlibrary.org/search.json",

            method: "GET",

            data: {
                q: searchTerm,
                limit: 10
            },

            dataType: "json",

            // Step 6: If request succeeds
            success: function (response) {

                const books = response.docs;

                if (!books || books.length === 0) {
                    $("#message").text("No books found.");
                    return;
                }

                // Step 7: Display books
                books.forEach(function (book) {

                    const title =
                        book.title || "Title not available";

                    const authors = book.author_name
                        ? book.author_name.join(", ")
                        : "Author not available";

                    // Create HTML elements using jQuery
                    const card = $("<div>").addClass("book-card");

                    const heading = $("<h2>").text(title);

                    const authorLine = $("<p>")
                        .text("Author(s): " + authors);

                    // Add elements to the card
                    card.append(heading, authorLine);

                    // Add card to webpage
                    $("#bookList").append(card);

                });

                $("#message").text(
                    "Found " + books.length + " book(s)."
                );

            },

            // Step 8: Handle API errors
            error: function () {

                $("#message").text(
                    "Could not load books. Check your internet connection."
                );

            },

            // Step 9: Execute after success or error
            complete: function () {

                $("#loadBooksBtn").prop("disabled", false);

            }

        });

    });

});
