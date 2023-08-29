import Swal from "sweetalert2";
Template.pagesDelete.helpers({
  distinctHeaders() {
    const uniqueHeaders = Array.from(
      new Set(
        Que.find()
          .fetch()
          .map((item) => item.header)
      )
    );

    return uniqueHeaders;
  },
});

Template.pagesDelete.events({
  "click #deleteButton": function (event, template) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const selectedHeader = template.find("#headerSelect").value;

        // Soruları silme kodu (Que koleksiyonu için)
        const questionsToDelete = Que.find({ header: selectedHeader }).fetch();
        questionsToDelete.forEach((question) => {
          Que.remove({ _id: question._id });
        });

        // Sonuçları silme kodu (Res koleksiyonu için)
        const resultsToDelete = Res.find({ lastName: selectedHeader }).fetch();
        resultsToDelete.forEach((result) => {
          Res.remove({ _id: result._id });
        });

        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  },
});
