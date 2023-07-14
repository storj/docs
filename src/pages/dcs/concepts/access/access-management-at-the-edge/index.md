---
title: Access Management at the Edge
slug: concepts/access/access-management-at-the-edge
createdAt: 2022-05-19T22:20:21.000Z
updatedAt: 2023-03-03T08:30:09.000Z
docId: hPCZn6O9uBcooyg4dzgBO
---

&#x20;A discussion of the implementation approach and benefits of an edge-based  delegated authorization model.

One of the areas where we’re seeing the strongest interest from developers, customers and partners building apps is our [security model and access control](https://www.storj.io/blog/2019/12/secure-access-control-in-the-decentralized-cloud/) layer. The security and privacy capabilities of the platform are some of the most differentiating features and they give our partners and customers some exciting new tools.

Distributed and decentralized cloud storage is a fantastic way to take advantage of underutilized storage and bandwidth, but in order to provide highly available and durable cloud storage, we needed to build in some fairly sophisticated security and privacy controls. Because we had to build with the assumption that any Node could be run by an untrusted person, we had to implement a zero-knowledge security architecture. This turns out to not only make our system far more resistant to attacks than traditional architectures, but also brings significant benefits to developers building apps on the platform.&#x20;

### Decentralized Architecture Requires Strong Privacy and Security

From the network perspective, we need to make sure the data stored on our platform remains private and secure. At the most basic level, we need to ensure that pieces of files stored on untrusted Nodes can’t be compromised, either by accessing that data or preventing access to that data. We combine several different technologies to achieve data privacy, security and availability.

From the client side, we use a combination of end-to-end encryption, erasure coding, and API Keys. Erasure coding is primarily used to ensure data availability, although storing data across thousands of diverse Storage Nodes does add a layer of security by eliminating any centralized honeypot of data.

By way of example, when a file or segment is erasure coded, it is divided into 80 pieces, of which any 29 can be used to reconstitute the (encrypted) file. With our zero-knowledge architecture, any Node Operator only gets one of the 80 pieces. There is nothing in the anonymized metadata to indicate what segment that piece belongs to, or where the other 80 pieces are etc. It’s worth noting that 80 pieces is the minimum number of pieces for a single object. Files larger than 64MB are broken up into 64 MB segments, each of which is further divided up into 80 pieces. A 1GB file for example is broken up into 16 segments, each with a different randomized encryption key, and each broken up into 80 pieces, for a total of 1,280 pieces.

If a hacker wants to obtain a complete object, they need to find at least 29 Nodes that hold a piece of each segment, compromise the security of each one (with each Node being run by different people, on different Nodes, using different firewalls, etc.). Even then, they would only have enough to reconstitute a file that is still encrypted. And, they’ll have to repeat that process for the next segment. Compare that to a situation (e.g. what was seen at Equifax a few years ago), where a simple misconfiguration gave access to hundreds of millions of individuals’ data, and you’ll see the power of this new model.

Just storing data on Storj DCS provides significant improvements over centralized data storage in terms of reducing threat surfaces and exposure to a variety of common attack vectors. But when it comes to sharing access to data—especially highly sensitive data—developers really experience the advantages of our platform. Where we’re already seeing the most interest from partners on the combination of end-to-end encryption and the access management capabilities of our API Keys.

### Separating Access and Encryption

One of the great things about Storj DCS is that it separates the encryption function from the access management capabilities of the API Keys, allowing both to be managed 100% client-side. From a developer perspective, managing those two constructs is easy because all of the complexity is abstracted down to a few simple commands. What this enables developers to do is move access management from a centralized server to the edge.

### Hierarchically Deterministic End-to-End Encryption

All data stored on Storj DCS is encrypted from the client side. What that means is users control the encryption keys and the result is an extremely private and secure data store. Both the objects and the associated metadata are encrypted using randomized, salted, path-based encryption keys. The randomized keys are then encrypted with keys derived from the user’s encryption passphrase. Neither Storj nor any Storage Nodes have access to those keys, the data, or the metadata.

By using hierarchically derived encryption keys, it becomes easy to share the ability to decrypt a single object or set of objects without sharing the private encryption passphrase or having to re-encrypt objects. Unlike the HD API Keys, where the hierarchy is derived from further restrictions of access, the path prefix structure of the object storage hierarchy is the foundation of the encryption structure.

A unique encryption key can be derived client-side for each object whether it’s a path or file. That unique key is generated automatically when sharing objects, allowing users to share single objects or paths, with the ability to encrypt just the objects that are shared, without having to worry about separately managing encryption access to objects that aren’t being shared.&#x20;

### Access Management with API Keys

In addition to providing the tools to share the ability to decrypt objects, Storj DCS also provides sophisticated tools for managing access to objects. Storj DCS uses hierarchically deterministic API Keys as an access management layer for objects. Similar to HD encryption keys, HD API Keys are derived from a parent API Key.

Unlike the HD encryption keys where the hierarchy is derived from the path prefix structure of the object storage hierarchy, the hierarchy of API Keys is derived from the structure and relationship of access restrictions. HD API Keys embed the logic for the access it allows and can be restricted, simply by embedding the path restrictions and any additional restrictions within the string that represents the API Key. Unlike a typical API key, the Storj DCS API Key is not a random string of bytes, but rather an envelope with access logic encoded in it.

### Bringing it Together with the Access&#x20;

Access management on Storj DCS requires coordination of the two parallel constructs described above—encryption and authorization. Both of these constructs work together to provide an access management framework that is secure and private, as well as extremely flexible for application developers. Both encryption and delegation of authorization are managed client-side.

While both of these constructs are managed client-side, it’s important to point out that only the API Keys are sent to the Satellite. The Satellite interprets the restrictions set by the client in the form of caveats, then controls what operations are allowed based on those restrictions. Encryption keys are never sent to the Satellite.

Sharing access to objects stored on Storj DCS requires sending encryption and authorization information about that object from one client to another. The information is sent in a construct called an Access. An Access is a security envelope that contains a restricted HD API Key and an HD encryption key—everything an application needs to locate an object on the network, access that object, and decrypt it.

To make the implementation of these constructs as easy as possible for developers, the Storj DCS developer tools abstract the complexity of encoding objects for access management and encryption/decryption. A simple share command encapsulates both an encryption key and an API Key into an Access in the format of an encoded string that can be easily imported into an Uplink client. Imported Accesses are managed client-side and may be leveraged in applications via the Uplink client library.

### Why Security at the Edge Matters

The evolution of cloud services and the transition of many services from on-premise to centralized cloud has massive increases in efficiency and economies of scale. That efficiency in many ways is driven by a concentration not only of technology, but expertise, and especially security expertise. That efficiency has also come at the cost of tradeoffs between security and privacy. Moreover, many new business models have emerged based almost entirely on the exchange of convenience for giving up the privacy of user data. In the cloud economy, user’s most private data is now more at risk than ever, and for the companies that store that data, new regulatory regimes have emerged, increasing the impact on those businesses if that data is compromised.

### The Intersection of Cybersecurity Skill and Decentralized Data

While the transition of on-premise to cloud has brought a reduction in the number and types of hacks, much of the vulnerability of on-premise technology was due in part to a lack of cybersecurity experience and expertise. A big part of the push to Gmail is the fact that it’s much less likely to get hacked than a privately operated mail server.

The transition to the cloud has resulted in a much greater separation of security expertise and technology use. The cost of best-in-class security expertise of cloud providers is, like the cost of infrastructure, spread across all customers. One additional consequence of that separation—the loss of cybersecurity expertise—is the lack of appreciation of the resulting tradeoff. That security does not come with transparency, and in fact, many times that security comes in exchange for a loss of privacy.

This is where a decentralized edge-based security model provides a similar security advantage but without the tradeoffs against transparency or privacy. With Storj, you get the benefit of the team’s distributed storage, encryption, security, and privacy expertise but you also get the full transparency of the open-source software. This ultimately enables the ability not only to trust but to verify the security of the platform, but that’s not where the difference ends. Storj provides all the security benefits of a cloud storage service, but provides the tools to take back control over your privacy.

### Edge-based Security + Decentralized Architecture = Privacy by Default

Classic authorization technologies are built for client-server architectures. Web-centric authorization schemes such as OAuth and JWT are built for largely synchronous transactions that involve separating the resource owner and the authorization service. Each of these approaches depends on its success on a central authority. To truly maximize privacy and security at a massive scale, there is a need to efficiently delegate resource authorization away from centralized parties.

Moving token generation and delegation closer to the edge of the architecture represents a fundamental shift in the way technologists can create verified trust systems. Having the ability in a distributed system to centrally initiate trust (via [](docId\:OXSINcFRuVMBacPvswwNU))  and extrapolate specifically scoped keys from that trust allows systems to generate their own trust chains that can be easily managed for specific roles and responsibilities. Authorization delegation is managed at the edge but derived based on a common, transparent trust framework. This means that [](docId\:OXSINcFRuVMBacPvswwNU) (access tokens) generated at the edge can be efficiently interpreted centrally, but without access to the underlying encrypted data.

Distributed and decentralized environments are designed to eliminate trust by definition. By moving security, privacy, and access management to the edge, users regain control over their data. With tools such as client-side encryption, cryptographic audits and completely open-source architecture, trust boundaries and risk are mitigated not by the service provider, but by the tools in the hands of the user.

### A Different Approach Delivers Differentiated Value Out-of-the-box

Storj DCS’s distributed cloud storage and edge-based security model provide easy tools for building applications that are more private, more secure, and less susceptible to the range of common attacks. With this approach, no incompetent or malicious operator can undermine security. By embracing decentralization and security at the edge, the system is architected to be resilient. Unlike other cloud storage providers, like the AWS Detective solution, Storj DCS integrates security features which are enabled by default. With Storj DCS, you don’t pay extra for security and privacy.

**Reduced Risk** - Common attacks (misconfigured access control lists, leaky buckets, insider threats, honeypots, man-in-the-middle attacks, etc.) depend for their success on breaching a central repository of access controls or gaining access to a treasure trove of data. The Storj DCS security model provides a way to architect out whole categories of typical application attack vectors.

**Reduced Threat Surface** - By separating trust boundaries and distributing access management and storage functions, a significant percentage of the typical application threat surfaces is either eliminated or made orders of magnitude more complex to attack.

**Enhanced Privacy** - With access managed peer-to-peer, the platform provides the tools to separate responsibilities for creating bearer tokens for access management from encryption for use of the data. Separation of these concerns enables decoupling storage, access management and use of data, ensuring greater privacy with greater transparency.

### Purpose-Built for Distributed Data

Distributed data storage architecture combined with edge-based encryption and access management stores your data as if it were encrypted sand stored on an encrypted beach. The combination of client-side HD Encryption keys and HD API Keys in an easy-to-use platform enables application developers to leverage the capability-based security model to build applications that provide superior privacy and security.

