var form = document.querySelector('.js-search-criteria'),
    body = document.getElementsByTagName('body')[0];

// On form submit, grab search criteria and call voting API
form.addEventListener('submit', function(e){
  e.preventDefault();

  var id = this.querySelector('.js-select').value,
      selectedMember = this.querySelector('.js-select option:checked').text,
      memberTitle = this.querySelector('.js-select option:checked').getAttribute('data-title'),
      limit = this.querySelector('#js-range').value,
      info = document.querySelector('.js-member-info'),
      name = info.querySelector('.js-member-name');

  console.log(selectedMember, id, limit);
  body.classList.add("js-form-active");

  // Display selected member info
  name.innerHTML = memberTitle + " " + selectedMember;

  info.classList.remove("hide");
  // votingSearch( id, limit );
});
