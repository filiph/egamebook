CREATE TABLE "consequences" (
	"decision_id" text,
	"actor" text,
	"initial_world" integer,
	"initial_world_time" datetime,
	"first_action" text,
	"depth" integer,
	"last_action_actor" text,
	"last_action" text,
	"probability" float,
	"success" text,
	"cumulative_probability" float,
	"time" datetime,
	"score" text,
	"self_score" float,
	"team_score" float,
	"enemy_score" float,
	"variety_score" float,
    "score_change" text,
    "self_score_change" float,
    "team_score_change" float,
    "enemy_score_change" float,
    "variety_score_change" float,
	"history" varchar,
	"world_state" varchar
);

CREATE VIEW decisions
AS
SELECT
	decision_id,
	actor,
	initial_world_time,
	COUNT(*) as options_count
FROM
	consequences
WHERE
	depth = 1
GROUP BY
	decision_id
ORDER BY
	initial_world_time ASC;
