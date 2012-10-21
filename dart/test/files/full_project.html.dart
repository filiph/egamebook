#import('../../lib/src/egb_library.dart');


// this will be rewritten with the actual file
#import('/Users/filiph/Programs/egamebook/dart/test/files/full_project.dart');


#import('dart:html');
#import('dart:isolate');

void DEBUG_CMD(String str) {
  print("CMD: $str");
}

class HtmlInterface implements UserInterface {
  ReceivePort _receivePort;
  SendPort _scripterPort;

  HtmlInterface() {
    DEBUG_CMD("HTML interface is starting.");

    // create [ReceivePort] and bind it to the callback method [receiveFromScripter].
    _receivePort = new ReceivePort();
    _receivePort.receive(receiveFromScripter);

    // create the isolate and send it the first handshake
    _scripterPort = spawnFunction(createScripter);
    _scripterPort.send(
        new Message.Start().toJson(),
        _receivePort.toSendPort()
    );

    // DOM
    paragraphsDiv = document.query("div#book-paragraphs");
    choicesDiv = document.query("div#book-choices");
    choicesOl = document.query("ol#book-choices-ol");
  }

  DivElement paragraphsDiv;
  DivElement choicesDiv;
  OListElement choicesOl;
  List choices;


  ParagraphElement createParagraph(String innerHtml) {
    if (paragraphsDiv == null) {
      return null;
    }

    if (innerHtml == "") {
      print("Received an empty string.");
      return null;
    }

    ParagraphElement p = new Element.tag("p");
    p.innerHTML = innerHtml;

    paragraphsDiv.elements.add(p);
    return p;
  }

  AnchorElement createChoice(String innerHtml, [String accessKey="", int hash]) {
    if (choicesOl == null) {
      return null;
    }

    LIElement li = new Element.tag("li");
    AnchorElement a = new Element.tag("a");
    a.innerHTML = innerHtml;
    if (hash != null) {
      a.on.click.add((Event ev) {
          _scripterPort.send(
            new Message.OptionSelected(hash).toJson(),
            _receivePort.toSendPort()
          );
          choicesOl.elements.clear();
      });
    }

    li.elements.add(a);
    choicesOl.elements.add(li);
    return a;
  }

  void receiveFromScripter(String messageJson, SendPort replyTo) {
    Message message = new Message.fromJson(messageJson);
    print("CMD: We have a message from Scripter: ${message.type}.");
    if (message.type == Message.MSG_END_OF_BOOK) {
      print("CMD: We are at the end of book. Closing.");
      _scripterPort.send(new Message.Quit().toJson());
      _receivePort.close();
    } else {
      if (message.type == Message.MSG_TEXT_RESULT) {
        print("Showing text from scripter.");
        createParagraph(message.strContent);
        _scripterPort.send(new Message.Continue().toJson(), _receivePort.toSendPort());
      } else if (message.type == Message.MSG_NO_RESULT) {
        print("No visible result. Continuing.");
        _scripterPort.send(new Message.Continue().toJson(), _receivePort.toSendPort());
      } else if (message.type == Message.MSG_SHOW_CHOICES) {
        print("We have choices to show!");
        if (message.listContent[0] != "") {
          createParagraph(message.listContent[0]);
        }
        choices = new List.from(message.listContent);
        
        if (choices.length == 2 && choices[1]['string'].trim() == "") {
          // An auto-choice (without a string) means we should pick it silently
          _scripterPort.send(
              new Message.OptionSelected(choices[1]['hash']).toJson(),
              _receivePort.toSendPort()
          );
        } else {
          // let player choose
          for (int i = 1; i < choices.length; i++) {
            createChoice(choices[i]['string'], accessKey:"$i", hash:choices[i]['hash']);
          }
        }
        // let player choose
        /*
        cmdLine.lineHandler = () {
          print("");
          try {
            int optionNumber = Math.parseInt(cmdLine.readLine());
            if (optionNumber > 0 && optionNumber < choices.length)
              _scripterPort.send(
                  new Message.OptionSelected(choices[optionNumber]['hash']),
                  _receivePort
                  );
          } catch (BadNumberFormatException e) {
            print("Input a number, please!");
          }
        };
        */
      }
    }
  }
}

void main() {
  new HtmlInterface();
}

/**
  Top-level function which is spawned by the [UserInterface] and which creates
  the [Scripter] instance.
  */
void createScripter() {
  new ScripterImpl();
}
