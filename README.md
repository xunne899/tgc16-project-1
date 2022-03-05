

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

# Title : Frontend Assignment 1 - Recycling Green Project

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
* Nav bar - dark green background <br>
  Nav bar - recycling logo <br>
  Nav bar - contains tab - home, about us, map, contact us (able to link to respective page when click)
* Carousel - 3 images - cardboard, plastic bags, plastics bottle
* Subscription form - a subscription form embedded within carousell in large screen <br>
  Subscription form - will be below carousell when in smaller mobile version
* Home page - hierarchy of recycling 
* About us - provide ul and li of items about recycling , 3Rs (reduce, reuse, recycle), key focus on our work and audiences
* Map - able to locate location using search bar(middle section)<br>
  Map- top right hand corner. filter layer to filter location of main recycling, lighting , second hand, e-waste bin.<br>
  Map - lower left hand corner show/hide cluster of  lighting , second hand, e-waste bin. show/hide of general waste bin<br>
  Map - last row of the map, middle portion shows the various icon legend. when hover description name of legend will popup<br>
  Map- when legend icon is click it will toggle on/off of the respective types of binicon location in the map.<br> 
* Contact us form - email, comments, rating , hear about us<br>
  Contact us form - will show validation error if no input upon clicking submit button. will show submitted details upon submission
* Location - address details with map
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
* Background Colors: Green and white to promote clean and green environment 
* Button Colors : Green and blue
[Surface Colours](./images/colors.png)

Typography:<br>

* Font Color : use are light green or dark green to blend with the background color

* Font Size: Normal size

* Layout: Website is able to view in mobile size (XS) and for large display like desktop


## 3. Features
Key features:<br> 

* User can enter address or postal code into searchbar to search for nearby main recycling bins<br>
  User can filter to see different types of bins( main, lighting, secondhand, ewaste)
* Toggle hide or show cluster button at bottom left of map (for secondhand, ewaste only)<br>
  Toggle hide - red color button<br>
  Toggle show - blue color button

* Hide or show general waste button beside toggle button at bottom left of map (General main waste only)<br>
  Hide general waste - red color button<br>
  Show general waste - blue color button



## 4. User Stories
As a user i would like to know the various recycling points around singapore and website information to dispose my waste for recycling

### 4.1 Acceptance criteria
Function of the  webpage allows user's to search for a specific area and able to view the details of the bin location by clicking on the bin icon.



## 5. Technologies Used
* HTML
* CSS
* Javascript
* [LeafletJS](https://leafletjs.com/) map features
* [axios](https://github.com/axios/axios) importing data from json file 
* [Bootstrap](https://getbootstrap.com/docs/5.0/getting-started/introduction/) aligning content, match its mobile responsiveness,carousel
* [Flaticon](https://www.flaticon.com/) map icons and legend
* [Canva](https://www.canva.com) basically green and white colour theme for webpage
* [Googlemap](https://www.google.com/maps) for company location
* [Onemap](https://www.onemap.gov.sg/docs/maps/) use onemap and leaflet to incorporate onemap map

## 6. Testing - Using the search bar 
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
