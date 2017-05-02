# DC Council Voting History SPA

The original plan was to use a [Location Verifier API](http://citizenatlas.dc.gov/newwebservices/locationverifier.asmx) which takes a DC address/zip code and outputs the locations voting precinct, police district, and most pertinent, which of the District's 8 Wards the location falls in. The Ward would then be used to search a separate DC Council api to grab the council member representing the specified ward and output their voting record from the [DC Legislation Information Management System](http://lims.dccouncil.us/api) api. Below is the proposed user flow:
![](userflow_ziplookup.jpg?raw=true)


Ideally, these apis will also provide contact and other detailed info for each council member to display alongside the voting history. Unfortunately, there is currently no public api which connects the dots between location specific data and the council members that represent them to the detail I would need. Since the api with the best documentation is the DC Council Legislation api, the project plan had to be shifted to focus more heavily on legislation.
![](userflow_revised.jpg?raw=true)


## The (Revised) Plan
- On page load:
  - Council Member data is pulled in and populated into the form dropdown
  - The Select options would display the member's name and have a value set to their Member ID
  - Users will also be able to adjust how many results are presented to them by adjusting the input range

- On Form submission:
  - The selected council member's title and name will be displays below the form
  - Create Table element
    - Populate it with the voting history search results
