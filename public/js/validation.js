$('.ui.form')
  .form({
    studentID: {
      identifier  : 'studentID',
      rules: [
        {
          type   : 'empty',
          prompt : 'Please enter your Student ID'
        }
      ]
    },
    firstName: {
      identifier  : 'firstName',
      rules: [
        {
          type   : 'empty',
          prompt : 'Please select a First Name'
        }
      ]
    },
    surname: {
      identifier : 'surname',
      rules: [
        {
          type   : 'empty',
          prompt : 'Please enter a Surname'
        }
      ]
    }
  })
;

$('.ui.modal')
  .modal()
;