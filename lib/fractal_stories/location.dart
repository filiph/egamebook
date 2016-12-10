library stranded.location;

class Location {
  final Set<LocationResource> resources;

  /// How easy it is to find this location by exploring from the initial
  /// location (beach).
  ///
  /// `1.0` means the location is known and reachable from the start.
  final num accessibility;

  final bool found; // Make things simple: all people know or none.

  Location(this.accessibility, this.resources, this.found);

  Location.duplicate(Location other)
      : this(other.accessibility,
            new Set<LocationResource>.from(other.resources), other.found);
}

/// Examples of resources are: crab hunting grounds, plane wreckage, pond,
/// spring.
class LocationResource {
  /// How easy it is to spot this resource when exploring the location.
  ///
  /// `1.0` means you can't miss it.
  final num findability;

  LocationResource(this.findability);
}
