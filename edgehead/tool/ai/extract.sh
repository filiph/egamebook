#!/usr/bin/env bash

# Run this file to extract AI data from a log file.

set -e

if [[ -z "$1" ]]
  then
    echo "Please supply the log file as an argument."
    exit 2
fi

# From https://stackoverflow.com/a/246128.
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

function find_sequential {
    local number=0
    local prefix="${SCRIPT_DIR}/$1"

    local filename="N/A"
    while [[ ${number} == 0 ]] || [[ -e "$filename" ]]; do
        printf -v filename -- '%s-%03d.csv' "$prefix" "$(( ++number ))"
    done

    echo ${filename}
}

CSV_OUT=$(find_sequential consequences)
echo "Preparing CSV file in $CSV_OUT."

# Please keep in sync with lib/util/ai_logger.dart.
COLUMNS=(
  decision_id
  actor
  initial_world
  initial_world_time
  first_action
  depth
  last_action_actor
  last_action
  probability
  success
  cumulative_probability
  time
  score
  self_score
  team_score
  enemy_score
  score_change
  self_score_change
  team_score_change
  enemy_score_change
  variety_score_change
  history
  world_state
)

# From https://stackoverflow.com/a/17841619.
function join_by { local IFS="$1"; shift; echo "$*"; }
HEADER=`join_by ';' ${COLUMNS[@]}`

echo ${HEADER} > ${CSV_OUT}

echo "Extracting from $1 to CSV file."
# The following line finds all lines with AI_CONSEQUENCE and then
# removes the part of the line in front of the data.
grep -n "AI_CONSEQUENCE:" $1 | sed 's|.*AI_CONSEQUENCE:\(.*\)|\1|' \
    >> ${CSV_OUT}

echo "CSV output: ${CSV_OUT}"

# Since we have SQL schema, the header would be imported as data.
CSV_WITHOUT_HEADER="${CSV_OUT}.no_header.csv"
tail -n +2 ${CSV_OUT} > ${CSV_WITHOUT_HEADER}

SQL_OUT="${CSV_OUT}.sql"
echo "Building SQL file: ${SQL_OUT}"

# Copy schema to top of SQL input.
cat "${SCRIPT_DIR}/consequences.sql" > ${SQL_OUT}

# Add import commands (https://stackoverflow.com/a/6977523)
echo ".separator ;" >> ${SQL_OUT}
echo ".import ${CSV_WITHOUT_HEADER} consequences" >> ${SQL_OUT}

SQLITE_OUT="${CSV_OUT}.db"
echo "Creating SQLite database: ${SQLITE_OUT}"

sqlite3 ${SQLITE_OUT} < ${SQL_OUT}

# No need to keep the CSV file without header. We do keep the original one.
rm ${CSV_WITHOUT_HEADER}
