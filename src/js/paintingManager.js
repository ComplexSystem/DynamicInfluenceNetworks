const PaintingManager = function() {
  let self = {
    inPaintingMode: true,
    overrideExistingClusters: true,

    isPaintingCluster: false,
    currentClusterNumber: -1,
    paintedClusters: [],

    paintedClusterColors: ['#e41a1c','#377eb8','#4daf4a','#984ea3','#ff7f00','#ffff33','#a65628','#f781bf']
  };

  function startPaintingNewCluster() {
    self.isPaintingCluster = true;
    self.currentClusterNumber++;

    self.paintedClusters.push([]);
  }

  function addNodeToPaintingCluster(node) {
    if (self.isPaintingCluster) {
      if (node.paintedCluster !== undefined) {
        _.remove(self.paintedClusters[node.paintedCluster], function(n) {
          return n.name === node.name;
        });
      }
      node.paintedCluster = self.currentClusterNumber;

      self.paintedClusters[self.currentClusterNumber].push(node);
    }
  }

  function stopPaintingCluster() {
    self.isPaintingCluster = false;
  }

  function unPaintAllNodes() {
    _.forEach(self.paintedClusters, function (cluster, i) {
      _.forEach(cluster, function(node) {
        delete node.paintedCluster;
      });
    });

    self.paintedClusters = [];
  }

  /* ========================= GETTERS && SETTERS =========================== */
  function setPaintingMode(isPainting) {
    self.inPaintingMode = isPainting;
  }

  function isInPaintingMode() {
    return self.inPaintingMode;
  }

  function isPaintingCluster() {
    return self.isPaintingCluster;
  }

  function isOverridingExistingClusters() {
    return self.overrideExistingClusters;
  }

  function getCurrentClusterNumber() {
    return self.currentClusterNumber;
  }

  function getPaintedClusters() {
    return self.paintedClusters;
  }

  function getClusterColor(clusterNumber) {
    return self.paintedClusterColors[clusterNumber % self.paintedClusterColors.length];
  }

  return {
    startPaintingNewCluster: startPaintingNewCluster,
    addNodeToPaintingCluster: addNodeToPaintingCluster,
    stopPaintingCluster: stopPaintingCluster,
    unPaintAllNodes: unPaintAllNodes,
    // setters/getters
    setPaintingMode: setPaintingMode,
    isInPaintingMode: isInPaintingMode,

    isPaintingCluster: isPaintingCluster,
    isOverridingExistingClusters: isOverridingExistingClusters,

    getCurrentClusterNumber: getCurrentClusterNumber,

    getPaintedClusters: getPaintedClusters,
    getClusterColor: getClusterColor
  };
};