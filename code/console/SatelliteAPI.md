# Satellite Console APIs

There are two APIs for customer use that are separate from the "metainfo API" used by Uplink: The "internal" API used for the satellite UI, and the "external" API intended for use by customers who have been provided access, on satellites where it is enabled.

This document describes general guidelines that should be followed when creating new or auditing existing endpoints for the Satellite Console APIs. It can be referenced when working on new endpoints for the Satellite Console, as well as when reviewing changes that add new endpoints.

## Guidelines

### Rate Limiting

There are two types of rate limiting used by these APIs: user-ID-based rate limiting, and IP-address-based rate limiting.

IP-address-based rate limiting should be used:
* when an endpoint can be called without being authenticated (e.g. signup, forgot password)

User-ID-based rate limiting should be used:
* when an endpoint requiring authentication may result in high database load/contention
* when an endpoint triggers emails
* when an endpoint modifies billing information

### Paid Tier Restrictions

There may be some features that should be disabled when a user is not paid tier.

Endpoints should be restricted to the paid tier when:
* there is a high potential for abuse from free tier users, and user-ID rate limiting is not sufficient to resolve it
* there are product or business requirements indicating that the feature should be for paid tier only

### Project Member Restrictions

There is a distinction between project "owners" (user who created a project), and project "members" (user who was invited to an existing project). In some cases, a project-level endpoint should be restricted for project members.

Project members should be restricted from performing an action on a project when:
* there are product or design requirements indicating that the feature should be for project owners only

### Injection Prevention

In some situations, a user may be prompted to enter information into a field that may be displayed to a different person when an action is triggered or when certain pages within the app are viewed.

Here are some questions to ask whenever taking user input and storing in the database or inserting into an email:
* is it possible for the user to inject malicious content into the input? E.g. can the user insert links, a message like "please send me money", etc...?
* after the input is sent, is this information visible from the UI? Is it visible only to the user who entered the information, or could others, like project members, also see this information?
* after the input is sent, is this information visible from any email sent by the Satellite? Is it visible only to the user who entered the information, or could others also see this information?

Depending on the answers to the above questions, it may be necessary to do one or more of the following:
* do not display information that could be maliciously injected to any user or email address other than the user who entered the information
* discuss with product, design, and/or marketing teams about whether it is necessary to collect the information
* sanitize the input before it is stored in the database or sent in an email (this should be avoided if possible, because there are almost always edge cases with sanitization, and being too restrictive can be a problem for users who use non-English characters)

