---
title: How does held back amount work?
docId: TPy59W2Kvxsj50ERIZ1hU
redirects:
  - /node/resources/faq/held-back-amount
---

The **held back amount (staked)** component provides a preferred way for Node Operators to exit the network. This model optimizes liveliness by deterring Nodes to exit the network without transferring their pieces (thus limiting repair costs). Importantly, this strikes an equilibrium between a very low cost of entry for Nodes while also way to insulate against the cost of data repair.

Nodes don't need to provide any up-front stake to start earning STORJ tokens as a Storage Node Operator. Rather, during the first nine months of Storage Node Operation, a percentage of earnings are placed in a holding account. These funds are held until a Storage Node Operator chooses to leave the network. After the 15th month, a portion of the balance is returned to the Storage Node Operator, while the remainder is held indefinitely.

If the Storage Node Operator uses the Graceful Exit function when leaving one or more satellites, the funds corresponding to the satellite(s) they exited will be returned in full after the exit is complete. If the Storage Node Operator exits the network abruptly without completing the Graceful Exit, the held back funds for all the satellites their node was operating on at the time of abrupt exit will be forfeited to offset the cost of data repair.

The withholding function is structured with a tiered reduction in withholdings as the amount of time the Node is active on the network increases. Note that the node age used to calculate the applicable held amount percentage will be calculated separately for each satellite, so if a satellite is added to the network after the node first started operating, the node age for that new satellite will start counting from zero at the time the new satellite was added. The withholding model is as follows:

- **Months 1-3**: 75% of Storage Node revenue is withheld, 25% is paid to the Storage Node Operator

- **Months 4-6**: 50% of Storage Node revenue is withheld, 50% is paid to the Storage Node Operator

- **Months 7-9**: 25% of Storage Node revenue is withheld, 75% is paid to the Storage Node Operator

- **Months 10-15**: 100% of Storage Node revenue is paid to the storage node operator

- **Month 16**: 50% of total withholdings are returned to Storage Node Operator, with the remaining 50% held until the node gracefully exits the network

The withholding model is designed to incentivize and reward both-long term reliable Storage Nodes as well as Nodes that, when they do choose to leave the network, exit in a way that is least damaging to the network.
