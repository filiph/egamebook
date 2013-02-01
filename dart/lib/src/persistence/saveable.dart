library egb_saveable;

abstract class Saveable {
  /**
   * When serializing a custom class and when it's Saveable, the Scripter
   * will call this method to get a Map describing this instance. The class
   * should be able to recreate its state from this Map.
   * 
   * The Map **needs** to include the key [:_class:] with a String value
   * of the name of the class. 
   */
  Map<String,dynamic> toMap();
  
  /**
   * Update the instance from a Map. Typically, the Map is a one that was
   * earlier set by the [toMap()] method and that was saved by the Runner
   * to a Storage.
   */
  void updateFromMap(Map<String,dynamic> map);
}