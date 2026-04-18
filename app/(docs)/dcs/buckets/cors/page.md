---
title: Cross-Origin Resource Sharing (CORS)
docId: ahF8zaeHahph5Lieceeke
metadata:
  title: Understanding Cross-Origin Resource Sharing (CORS) with Storj's S3 API
  description:
    Storj's S3 API includes a permissive CORS policy by default. Users
    should be aware of the security implications of this open approach.
---

## Understanding CORS on Storj's S3 Compatible API

Storj's [S3 compatible API](docId:eZ4caegh9queuQuaazoo) automatically includes a permissive CORS policy by default. All responses from this API contain the header `Access-Control-Allow-Origin: *`, indicating that resources can be accessed from any domain. This eliminates the need for users to configure CORS settings individually. It's important to be aware of the security implications of this open approach, as it allows unrestricted cross-origin access to the stored data. Users should ensure that their usage scenarios align with the inherent openness of this policy.
