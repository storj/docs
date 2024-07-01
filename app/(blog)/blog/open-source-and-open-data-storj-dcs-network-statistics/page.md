---
author:
  name: Brandon Iglesias
date: '2021-08-24 00:00:00'
heroimage: ./20487c1035ee937f.jpeg
layout: blog
metadata:
  description: "We recently began publicly exposing more data about the network in\
    \ a way that could be used on-demand and programmatically. If you missed it, we\
    \ have started publishing what we think is the most important network statistics\
    \ on our new Storj DCS Public Network Statistics page. Now, if you\u2019re a non-technical\
    \ person, this may not be what you expected. Here\u2019s an explanation of why\
    \ we took this approach."
  title: 'Open Source and Open Data: Storj DCS Network Statistics'
title: 'Open Source and Open Data: Storj DCS Network Statistics'

---

You might often see or hear us reference our company values. The fact of the matter is that our values—including openness, transparency, and empowering our community—are what drives us as a company and as individuals. Our values are our north star, so when faced with decisions or when we find ourselves at a crossroads, we often reexamine the situation through the lens of our company values.   


Our company value of Open means we’re committed to the free and open sharing of software, information, knowledge, and ideas. It’s been shown this kind of openness yields better results in the long run—not just for the company but for the industry and community as well. Open source software has been the cornerstone for innovations such as containers and microservices, private web browsing, and new databases that enable other powerful services. This is why [we are committed to open source software](https://www.storj.io/open-source).    


Since the launch of Storj DCS, our community has been asking for more statistics and data on the network. Some folks in our community have even found ways of reverse-engineering the network to derive statistics about it. A great example of this ingenuity is [Storj Net Info](https://storjnet.info/). Providing these statistics has always been a goal of ours, but the task has been lower on our priority roadmap list than delivering some other critical features that Storj DCS customers need.   


We [recently](https://forum.storj.io/t/publicly-exposed-network-data-official-statistics-from-storj-dcs-satellites/14103) began publicly exposing more data about the network in a way that could be used on-demand and programmatically. If you missed it, we have started publishing what we think is the most important network statistics on our new [Storj DCS Public Network Statistics](https://stats.storjshare.io/) page. Now, if you’re a non-technical person, this may not be what you expected. Here’s an explanation of why we took this approach.   


New members of our community often ask why don't we build a service like Dropbox or Google Drive instead of a cloud object storage service like Storj DCS. This is because we’re focused on providing the building blocks (underlying storage layer) for others to build those kinds of applications. By doing this, we can enable dozens of companies to build Dropbox-like services on Storj DCS (or easily migrate their existing applications to the service).   
  
We decided we wanted to take a similar approach with these statistics, so we’re exposing the data in JSON format instead of just providing a dashboard for people to view. On this page, you’ll find statistics such as the amount of data stored and transferred across the network and information about the Nodes on the network. The data on this page is automatically updated every hour so you can make time-series charts.   
  
You’ll also start seeing these statistics appear on various pages across the site, including our homepage and Node Operator page. These pages will be updated every hour when new data is published on the network statistics page.  


The data we are exposing include the following statistics:   


### Statistics about stored and transferred data

* **bandwidth\_bytes\_downloaded** - number of bytes downloaded (egress) from the network for the last 30 days
* **bandwidth\_bytes\_uploaded** - number of bytes uploaded (ingress) to the network for the last 30 days
* **storage\_inline\_bytes** - number of bytes stored in inline segments on the Satellite
* **storage\_inline\_segments** - number of segments stored inline on the Satellite
* **storage\_median\_healthy\_pieces\_count** - median number of healthy pieces per segment stored on Storage Nodes
* **storage\_min\_healthy\_pieces\_count** - minimum number of healthy pieces per segment stored on Storage Nodes
* **storage\_remote\_bytes** - number of bytes stored on Storage Nodes (it does not take into account the expansion factor of erasure encoding)
* **storage\_remote\_segments** - number of segments stored on Storage Nodes
* **storage\_remote\_segments\_lost** - number of irreparable segments lost from Storage Nodes
* **storage\_total\_bytes** - total number of bytes (both inline and remote) stored on the network
* **storage\_total\_object**s - total number of objects stored on the network
* **storage\_total\_pieces** - total number of pieces stored on Storage Nodes
* **storage\_total\_segments** - total number of segments stored on Storage Nodes
* **storage\_free\_capacity\_estimate\_bytes** - a statistical estimate of free Storage Node capacity, with suspicious values removed

### Statistics about Storage Nodes

* **active\_nodes** - number of Storage Nodes that were successfully contacted within the last 4 hours, excludes disqualified and exited Nodes
* **disqualified\_nodes** - number of disqualified Storage Nodes
* **exited\_nodes** - number of Storage Nodes that gracefully exited the Satellite, excludes disqualified Nodes
* **offline\_nodes** - number of Storage Nodes that were not successfully contacted within the last four hours, excludes disqualified and exited Nodes
* **suspended\_nodes** - number of suspended Storage Nodes, excludes disqualified and exited Nodes
* **total\_nodes** - total number of unique Storage Nodes that ever contacted the Satellite
* **vetted\_nodes** - number of vetted Storage Nodes, excludes disqualified and exited Nodes
* **full\_nodes** - number of Storage Nodes without free disk

### Statistics about user accounts

* **registered\_accounts** - number of registered user accounts

‍  


Since we launched this, one of our community members built this really cool [grafana dashboard](https://storjstats.info/d/storj/storj-network-statistics?orgId=1). Check it out. We’ll be sharing more about this and other community-built dashboards in the coming weeks, but we hope that exposing this data will continue to enable others to build amazing things like this!

‍  
As we continue to expand on the data points we expose, we’ll be adding more of this data to our [website](http://storj.io) as well. If you have any ideas or suggestions on what else we should be exposing, please open a GitHub [issue](https://github.com/storj/stats/issues) in the [repository](https://github.com/storj/stats) for this project.  


  


