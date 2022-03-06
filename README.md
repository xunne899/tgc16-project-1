
# Content
1. Summary of project
2. UX/UI 
3. Features 
4. User Stories
5. Technologies Used
6. Testing 
7. Test Cases
8. Deployment
9. Live Link
10. Credits and Acknowledgement

# Title : Frontend Assignment 1 - Green Recycling Project

## 1. Summary
* Lots of unwanted waste are disposed and it is harming the environment
* Seeing many waste being disposed without much consideration, it sparks the owner's idea to create awareness about recycling

## 2. UI/UX

### 2.1 Scope
The purpose of this green project is to promote awareness of recycling, let public know about the importance of green environment. User's are able to locate recycling bin location by using webpage map

### 2.2 Strategy 
* Create a webpage to inform public and audience about the importance of recycling
webpage(mainly green and white color theme to promote a green and clean concept to save our environment.)
* Provide location of main recycling bin, lighting recycling waste bin, second hand recycling point and electronic waste point。Enable public to dispose their waste.

#### 2.2.a. User Goals
* Targeted Audience: Public,Schools and Government Bodies
* User able to find their desired recycling bin location using the web search function
* User able to locate various types of recycling bin (main, lighting, electronic, second hand )

#### 2.2.b. Organisation's Goals
* Able to provide relevant recycling information and knowledge to the public


### 2.3 Structure
* Nav bar: dark green background <br>
  Nav bar: recycling logo <br>
  Nav bar: contains tab - home, about us, map, contact us (able to link to respective page when click)<br>
  Nav bar:  home, about us, map, contact us (color will change to green when mouse hover over tab)
* Carousel: 3 images - cardboard, plastic bags, plastics bottle
* Subscription form: a subscription form embedded within carousell in large screen <br>
  Subscription form: will be below carousell when in smaller mobile version
* Home page: hierarchy of recycling 
* About us: provide ul and li of items for About recycling , 3Rs (reduce, reuse, recycle), Promoting recycling 
* Map: able to locate location using search bar(top center section)<br>
  Map: top left hand corner. non-default leaflet cutomise zoom in(+) zoom out(-) function <br>
  Map: top right hand corner. filter layer to filter location of main recycling, lighting , second hand, e-waste bin.<br>
  Map: top right hand corner filter layer - no clustering for lighting recycling bin. Only 2 locations, only on/off location <br>  
  Map: lower left hand corner show/hide cluster of second hand, e-waste bin. Show/hide of general main waste bin<br>
  Map: row just below of the map, center of green bar shows the various types of icon legend. When hover - description name of legend will popup<br>
  Map: when legend icon is click it will toggle on/off of the respective types of binicon location in the map.<br> 
* Contact us form: email, comments, rating, hear about us<br>
  Contact us form: will show validation error if no input upon clicking submit button. will show submitted details upon submission
* Location: address details with map<br>
![Web Structure](./images/structure_webpage.png)

### 2.4 Skeleton
Webpage consists of simple 3 components
* Navbar
* Body
* Footer

Navbar is located at the top of webpage.<br>
Navbar consists of logo and name hyperlinks to respective pages.<br>
Footer at the bottom page with copyright and font aswesome logo.<br>

![Skeleton](./images/skeleton.png)

### 2.5 Surface 

#### 2.5.a Background<br>
* Background Colors: Green and white to promote clean and green environment 
* Button Colors : Green and blue
[Surface Colours](./images/colors.png)

#### 2.5.b Typography<br>

* Font Color : use are light green or dark green to blend with the background color
* Font Size: Normal size


#### 2.5.c Images<br>
* Images : uses recycling images for carousel, recycling icon and logo to fit the theme
* Website is able to view in mobile size (XS) and for large display like desktop


## 3. Features
Navigation Bar<br>
* Home, About us, Map, Contact us(click tab to link to respective page)
Subscription Form<br>
* User may key in their email to the email box to get recycling news.<br>
  Error will display if no input ubon submission 
About Us<br>
* Under the list there is a click here at the bottom to link to recycle website for more information<br>
Map<br> 
* SearchBar<br>
  User can enter address or postal code into searchbar to search for nearby main recycling bins<br>
  User can filter to see different types of bins( main, lighting, secondhand, ewaste)
* Zoom Function<br>
  User able to use the self customise zoom in zoom out function to view the map size they wanted
* Toggle Button<br>
  Toggle hide or show cluster button at bottom left of map (for secondhand and  ewaste only)<br>
  Toggle hide - red color button<br>
  Toggle show - blue color button
* Hide or show general waste button<br>
  Hide or show general waste button beside toggle button at bottom left of map (General main recycling waste only)<br>
  Hide general waste - red color button<br>
  Show general waste - blue color button
* Legend Icon <br>
  Just below the map, the dark green bar shows the legend icon of various types of recycling bin<br>
  When user hover mouse over icon, icon is able to show name of the various bin types<br>
  When user clicks on icon, the map will display the respective types of bins<br>
  When legend icon displays color - not click<br>
  When legend icon is opaque in color - the icon is click<br>
Contact us<br>
* User able to select the type of questions they want to enquire, type in email, comments, hear about us and rate experience.<br>
  Error will display if no input ubon submission<br>
  Upon submission a confirmation of user input details will show<br> 
  


## 4. User Stories
As a user i would like to know the various recycling points around singapore and website information to dispose my waste for recycling

### 4.1 Acceptance criteria
Function of the  webpage allows user's to search for a specific area and able to view the details of the bin location by clicking on the bin icon.


## 5. Technologies Used
* HTML
* CSS
* Javascript
* axios - importing data from json file 
* [LeafletJS](https://leafletjs.com/) map features
* [Bootstrap](https://getbootstrap.com/docs/5.0/getting-started/introduction/) aligning content, match its mobile responsiveness,carousel
* [Flaticon](https://www.flaticon.com/) map icons and legend
* [Canva](https://www.canva.com) basically green and white colour theme for webpage
* [Googlemap](https://www.google.com/maps) for company location
* [Onemap](https://www.onemap.gov.sg/docs/maps/) use onemap and leaflet to incorporate onemap map

## 6. Testing  


|Categories      |Sections                       |Test Output                                                                                                   |
| :-------       | :------------                 | :-------------------                                                                                         |
|Webpage         |Mobile Responsiveness          |No visible error                                                                                              |
|Navigation Bar  |Home Tab                       |Able to link to Home section, when hover color will change                                                    |
|Navigation Bar  |About Us Tab                   |Able to link to About us section, when hover color  will change                                               |
|Navigation Bar  |Map Tab                        |Able to link to Map section, when hover color will change                                                     |
|Navigation Bar  |Contact Us Tab                 |Able to link to Contact Us section, when hover color will change                                              |
|Navigation Bar  |Mobile Responsiveness          |Shrink according to screen size, those links in navbar will be hidden in nav dropdown button                  |
|Carousel        |Images                         |Able to auto slide, change to next image                                                                      |
|Carousel        |Mobile Responsiveness          |Shrink according to screen size, autoslide function still works in different screen size                      |
|Content         |Subscription form              |Able to submit and show user input upon submission.                                                           |
|Content         |Subscription form              |Show error when no input/invalid input                                                                        |  
|Content         |Home                           |Image of hierachy fits the background                                                                         |
|Content         |About Us                       |Click here links under each boxes, able to link to the desire webpage for more information                    |
|Content         |Map                            |Searchbar (topmost center portion of map), able to search for max 10 results                                  |
|Content         |Map                            |Zoom in/Zoom out buttons(top left), able to function                                                          | 
|Content         |Map                            |Show Cluster and General waste buttons(bottom left) works well                                                |
|Content         |Map                            |Filter check box able to display or hide recycling bin (top right)                                            |
|Content         |Map                            |4 recycle legend icon bar right below the map able to toggle on off recycling bin location when click         |
|Content         |Contact us Form                |Forms are able to process values and dislay errors if no input when submitted                                 |
|Content         |Location                       |Able to show address under google map                                                                         |
|Content         |Mobile Responsiveness          |Able to view in mobile version and large screen                                                               |
|Footer          |Mobile Responsiveness          |Able to view in mobile version and large screen                                                               |
## 7. Test case - Using the search bar 
## 8. Deployment 
 Host by using Netlify.

**Steps for deployment:**
* Edits were added, commited, and pushed to GitHub via Gitpod.
* Access https://www.netlify.com/ and log in via a Github account.
* Next, click on "New site from Git" button
* Select "GitHub" for continuous deployment
* Select authorize access to GitHub should a pop-up appear
* Select the repository that you want to deploy
* Click on "Deploy site" button to get a link for the deployed site



## 9. Live link
https://xunne899-tgc16project1-h18wsxcpy4p.ws-us34.gitpod.io/

## 10. Credits and Acknowledgement
Credits to:
Datagenetics (Recycling Navbar Logo)<br>
https://datagenetics.com/blog/june52021/index.html<br>
Zero waste SG (using pictures and website information)<br>
http://www.zerowastesg.com/<br>
Flaticon(using web various bins icon for my project)<br>
https://www.flaticon.com/<br>
Googlemap (using googlemap for company address location)<br>
Bootstrap <br>
Onemap()



