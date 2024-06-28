---
author:
  name: Brandon Iglesias
date: '2021-11-04 00:00:00'
layout: blog
metadata:
  description: "November 2021 Product Update,\_By the Product Team @Storj"
  heroimage: /blog/november-2021-storj-product-update/3a44980925b05d58.png
  title: November 2021 Storj Product Update
title: November 2021 Storj Product Update

---

November 2021 Product Update  

  


By the Product Team @Storj

  


Hello Everyone,  


We hope you had a great [Hacktoberfest!](https://hacktoberfest.digitalocean.com/) We focused on hacking away on some really exciting features for Storj DCS. The leaves are falling, so we dug into our repository of seasonal coffee combinations. We checked out the pumpkin spice latte recipe. Over the course of the month, we expect to refactor parts of this recipe and create a pull request that we will publish for review.  


**Spotlight: Hot Rodding Decentralized Storage Part 1**  


We believe our product is differentiated in four major areas compared to other cloud storage providers: privacy, security, complexity, and performance. November is Performance month, and we’ll be releasing a series of blog posts explaining how to get insane download speeds from Storj DCS. Check out the first of these blog posts [here.](https://storj.io/blog/hot-rodding-decentralized-storage)  


**New Features**  


* The new uplink binary now has a server-side move command. You can rename a file or move it to a different folder or even bucket without having to download and reupload the object.
* We added the ability for users within uplink to set the parallelism when downloading data. This change allows customers to saturate their networks and achieve the best performance possible from Storj DCS. You can learn more about this in the blog post spotlighted above.
* We added the ability to do byte-range seeking, meaning you could upload a zip file and then download a single object within that zip instead of the entire thing. This functionality was added to uplink CLI.
* We simplified our customer onboarding experience by adding a magic link in the account activation email. When a user clicks on this link to activate their account, they’ll be logged in automatically.
* For more information about smaller items we’ve completed in the last month, please look at our changelogs: [v1.40.4](https://forum.storj.io/t/changelog-v1-40-4/15590), [v1.41.2](https://forum.storj.io/t/changelog-v1-41-2/15761).

  


**Upcoming Features:**  


* Creating a new project dashboard screen, an all-projects dashboard screen, bucket details screen, and updating the object details screen. These new screens will give our users more insights into their usage.
* Designing a new experience for the access page in the Satellite GUI so that users can more easily create the credentials they need.
* Deploying the new navigation bar in the Satellite GUI to improve navigation and give the user more screen real-estate.
* Adding the ability to signup with a promo code embedded in the URL so that the promo code is automatically added to the new user’s account.

  


**For More Information:**  


* Dive into our code or contribute by visiting our [GitHub](https://github.com/storj/storj) repository.
* Reach out to us by emailing [ask@storj.io](mailto:ask@storj.io) or through our [community forum](https://forum.storj.io).
