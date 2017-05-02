var form = document.querySelector('.js-search-criteria'),
    table = document.querySelector('.js-voting-record'),
    body = document.getElementsByTagName('body')[0];

// Voting search for most recent legislation
// Voting Record API reference: http://lims.dccouncil.us/api/Help/Api/POST-v1-Voting-Search_rowLimit_offSet
function votingSearch (id, rowLimit){
    var errorMsg = document.createElement('p'),
        maxResults = document.querySelector('.js-total-results');

    // placeholder error element
    errorMsg.setAttribute("class", "alert");

    var request = new XMLHttpRequest();
    request.open('POST', 'http://lims.dccouncil.us/api/v1/Voting/Search?rowLimit=' + rowLimit + '&offSet=0');
    request.setRequestHeader('Content-Type', 'application/json')
    request.withCredentials = false;
    var data = {
      "CouncilPeriod": 22,
      "CouncilMember": id
    }
    request.send( JSON.stringify( data ) )

    request.onreadystatechange = function() {
      if ( request.readyState === 4 && request.status === 200) {
        console.log( request.response );
        // Show total results
        maxResults.innerHTML = rowLimit;

        // remove loading class to reveal results
        table.classList.remove("loading");

        // Construct table elements
        var votingRecord = JSON.parse( request.response ),
            tableBody = document.querySelector('.js-voting-record tbody'),
            legislationNumCol = document.createElement('td'),
            legislationTitleCol = document.createElement('td'),
            voteCol = document.createElement('td'),
            voteDate = document.createElement('td'),
            videoCol = document.createElement('td'),
            limsUrlBase = "http://lims.dccouncil.us/Legislation/";

        // Loop through the search results and output the relevant fields into the table
        for (var i=0; i< votingRecord.length; i++) {
          // Create a new table row and appendChild td values
          // to cloned table columns/cells
          var row = document.createElement('tr'),
              number = legislationNumCol.cloneNode(true),
              title = legislationTitleCol.cloneNode(true),
              vote = voteCol.cloneNode(true),
              video = videoCol.cloneNode(true),
              date = voteDate.cloneNode(true),
              link = document.createElement('a')
              videoLink = document.createElement('a');

          // Reformat Voting date
          var dateofvote = new Date( votingRecord[i].DateOfVote ),
              vote_day = dateofvote.getDate(),
              vote_month = dateofvote.getMonth() + 1, // offset 0 based month
              vote_year = dateofvote.getFullYear();

          // construct link to Legislation page
          link.setAttribute("href", limsUrlBase + votingRecord[i].LegislationNumber);
          link.setAttribute("target", "_blank");
          link.innerHTML = votingRecord[i].LegislationNumber;
          number.appendChild( link );

          // Live hearing video link
          var icon = '<i class="fa fa-file-video-o" aria-hidden="true"></i>';
          videoLink.setAttribute("href", votingRecord[i].VideoLink);
          videoLink.setAttribute("target", "_blank");
          videoLink.innerHTML = icon ;
          console.log( videoLink );
          video.appendChild( videoLink );

          // Add td values
          title.innerHTML = votingRecord[i].Title ;
          vote.innerHTML = votingRecord[i].MemberVotes[0].Result ;
          date.innerHTML = vote_month + '/' + vote_day + '/' + vote_year ;

          // Append row elements to the row
          // and then append the row to the table body
          row.appendChild( number );
          row.appendChild( title );
          row.appendChild( video );
          row.appendChild( date );
          row.appendChild( vote );

          tableBody.appendChild( row );
        }
      } else if ( request.readyState === 4 && request.status !== 200) {
        // request error
        errorMsg.innerHTML = 'Not able to access voting API. ' + request.statusText;
        block.replaceChild(errorMsg, table);
      }
    }
}

// On form submit, grab search criteria and call voting API
form.addEventListener('submit', function(e){
  e.preventDefault();

  var id = this.querySelector('.js-select').value,
      selectedMember = this.querySelector('.js-select option:checked').text,
      memberTitle = this.querySelector('.js-select option:checked').getAttribute('data-title'),
      limit = this.querySelector('#js-range').value,
      name = document.querySelector('.js-member-name');

  console.log(selectedMember, id, limit);
  body.classList.add("js-form-active");
  table.classList.add("loading");

  // Display selected member info
  name.innerHTML = memberTitle + " " + selectedMember;

  votingSearch( id, limit );
});
