library egb_saveable;

abstract class Saveable {
  /**
   * When serializing a custom class and when it's Saveable, the Scripter
   * will call this method to get a Map describing this instance using 
   * primitives. The class should be able to recreate its instance state from 
   * the contents of this Map alone.
   */
  Map<String,dynamic> toMap();
  
  /**
   * The name of the class, so the instance can be constructed later. This
   * will be added to the Map created by toMap.
   */
  String className;
  
  /**
   * Update the instance from a Map. Typically, the Map is a one that was
   * earlier set by the [toMap()] method and that was saved by the Runner
   * to a Storage.
   */
  void updateFromMap(Map<String,dynamic> map);
}