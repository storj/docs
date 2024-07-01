---
author:
  name: Brandon Iglesias
date: '2018-09-20 00:00:00'
layout: blog
metadata:
  description: "Last week, we had our Q3 all hands meeting with the majority of our\
    \ team here in Atlanta, GA. This was my first all hands experience with Storj\
    \ Labs and the energy of our team was through the roof. The theme for the week\
    \ was \u201CThe White Paper is Coming\u201D so we spent a lot of our time writing\
    \ and fi..."
  heroimage: ./8855fa2f80969623.png
  title: Product Manager Development Update 7
title: Product Manager Development Update 7

---

Last week, we had our Q3 all hands meeting with the majority of our team here in Atlanta, GA. This was my first all hands experience with Storj Labs and the energy of our team was through the roof. The theme for the week was “The White Paper is Coming” so we spent a lot of our time writing and finalizing sections of the white paper for publication. If you missed our quarterly town hall video update, you can watch it [here](https://www.youtube.com/watch?v=EcZ3T3eVwsM&t=518s). It includes a great [demo of the V3 network](https://www.youtube.com/watch?v=IdOt6RxZws4) made by JT Olio, our Director of Engineering! 

Recent development accomplishments:

* Made significant advances on the V3 white paper. These include writing, copy editing and finalizing various sections.
* We pipelined our bandwidth allocation messages to increase performance on the new network.
* We added additional functionality to the new Storj CLI, including commands to create/delete buckets.
* We fixed several bugs to improve overall user experience.
* We configured Jenkins to automate our binary builds. This helps us push the newest version of our Uplink software to our alpha partners more effectively.

In our next update, we plan to share updates on:

* The V3 white paper next steps:
* Finish internal editing, formatting and illustration creation.
* Sending it out to our list of external 3rd party reviewers including OSS partners.
* Incorporate final edits and adjustments.
* Adding a few more methods to Kademlia to do things such as ping a node, get nodes, and pinging nodes back to verify they are who they say they are.
* Creating a component in the satellite that audits storage nodes to see if they have the pieces of the files they should. The white paper has a lot more details about this, which you will be able to read once it's released.
* Initial work on our data repair component. This component is responsible for regenerating pieces of segments from storage nodes that have gone offline and uploading them to new storage nodes.
* Incorporating Satellite signed proofs, this will allow storage nodes to verify that commands have been approved by the Satellite.

If you want to know what else we have been working on, take a look at our [previous development update](https://storj.io/blog/2018/09/product-mgr-development-update-6/) or visit our [GitHub](https://github.com/storj/storj) repository. If you have questions, feel free to reach out by emailing [ask@storj.io](mailto:ask@storj.io) or through our [community forum](https://community.storj.io/).

- Brandon Iglesias, Product Manager

