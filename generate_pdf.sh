if (( $# != 2 )) 
then 
  echo "Usage: generate_pdf.sh <input.md> <output.pdf>"
  echo "Install dependencies using: brew install markdown htmldoc"
  exit 1
fi
markdown $1 | htmldoc --cont --headfootsize 8.0 --fontsize 12 \
    --size 5.1x7.8in --left 0.7in --right 0.7in \
    --linkcolor blue --linkstyle plain --format pdf14 - > $2