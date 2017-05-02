# DC Council Member Voting Record
GA js-dc-4 Final Project

## Overview
An single page application to display current DC Council Members' voting record on the latest legislation. It will use the [DC LIMS Web Voting API](http://lims.dccouncil.us/api/Help/Api/POST-v1-Voting-Search_rowLimit_offSet) to request legislation votes from a user specified Council Member. Council Member data will be pulled from the [member api](http://lims.dccouncil.us/api/Help/Api/GET-v1-masters-Members-councilPeriod) call. Once a council member is selected, a list of the DC Council's most recent legislation and how the selected council member voted on each legislation.

## Technical Requirements
My application will rely on require js to build the scripts and maintain a modular approach. RequireJS is included as a public asset instead of as node module so that there are no public references to node packages on production.
