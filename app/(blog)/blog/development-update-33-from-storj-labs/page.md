---
author:
  name: Brandon Iglesias
date: '2019-12-06 00:00:00'
heroimage: ./8855fa2f80969623.png
layout: blog
metadata:
  description: "As we roll into the holidays our team is working hard getting our\
    \ network ready for our next major release, Voyager. Voyager is our first production\
    \ release and we\u2019re more excited about it than the holidays. We\u2019re still\
    \ looking for more Nodes to join ahead of our Voyager release, please sign up\
    \ o..."
  title: Development Update 33 from Storj Labs
title: Development Update 33 from Storj Labs

---

As we roll into the holidays our team is working hard getting our network ready for our next major release, Voyager. Voyager is our first production release and we’re more excited about it than the holidays. We’re still looking for more Nodes to join ahead of our Voyager release, please sign up on the [waitlist](https://storj.io/sign-up-node-operator/) to get an auth token for your Node!

#### Development Accomplishments:

* We improved our auditing service by creating another outcome for audits. This fifth outcome for an audit will ensure Storage Nodes aren’t incorrectly penalized.
* We improved the SNO dashboard by updating it to show the Satellite nicknames as well as fixing a couple of bugs on the dashboard.
* We finished the garbage collection trash functionality which will allow us to enable garbage collection in production.
* We finished our credit card functionality on the Satellite so that our users can add a credit card as a payment method before we go into production and start charging. We recently announced our pricing model [here.](https://storj.io/blog/2019/11/announcing-pioneer-2-and-tardigrade.io-pricing/)
* We reduced the size of the Satellite databases along with adding support for CockrochDB. CockrochDB is an open-source horizontally scaling database.
* We resolved a memory leak on the Storage Nodes so that they perform better and use fewer resources.

#### In Our Next Post, We'll Cover:

* Finishing the zombie segment cleaner so that segments that are inaccessible are automatically deleted.
* Finishing the improvements to our delete architecture so that the delete operations on the network are more efficient for both users and Storage Node Operators.
* Finishing the Storage Node Dashboard notifications system to improve the overall SNO experience.
* Finishing support for STORJ token payments on the Satellites so that our clients can utilize STORJ tokens instead of a credit card as their payment method.
* Finishing the trusted Satellite’s functionality so that SNOs can start taking advantage of this and do business with more Satellites on the network.

#### For More Information:

* Look at our [product roadmap](https://storjlabs.aha.io/published/01ee405b4bd8d14208c5256d70d73a38?page=1) and previous [development updates](https://storj.io/blog/2019/11/development-update-32-from-storj-labs/).
* Dig into the code or contribute to the project by visiting our [GitHub](https://github.com/storj/storj) repository.  Reach out by emailing ask@storj.io or through our [community forum](https://forum.storj.io).
