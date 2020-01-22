with cte as	
(SELECT distinct
    case when club_name is null then 'no club' else club_name end as [club_name], 
    case when club_id is null then 0 else club_id end as [club_id]
    FROM cognetic_members_club C
    RIGHT JOIN cognetic_rules_group G on g.group_clubid = c.club_id)
    
    
    SELECT 	
    cte.club_name,
    cte.club_id,
    (
        SELECT
			r.recognition_name,
			r.recognition_id,
				(
					SELECT rule_name, rule_id
					FROM cognetic_rules_rule RR
					WHERE r.recognition_ruleid = RR.rule_id
					FOR JSON PATH
				) 'rule'
        FROM cognetic_campaigns_recognition r
        WHERE r.recognition_clubid = club_id
        AND r.recognition_groupid is NULL
        FOR JSON PATH
    ) 'club_recognitions',
    (
        SELECT
        group_name, 
        group_id,
        (
            SELECT level_name, level_id
            FROM cognetic_members_level
            WHERE level_group = G.group_id
            FOR JSON PATH
        ) 'levels',
        (
            SELECT g2.group_name, g2.group_id
            FROM cognetic_rules_group g1
            JOIN cognetic_rules_group g2 on g1.group_parentGroupid = g2.group_id
            where g.group_id = g1.group_id
            FOR JSON PATH 
        ) 'groups',
        (
            SELECT recognition_name,recognition_id,
            (
                SELECT level_name, level_id
                FROM cognetic_members_level
                WHERE level_id = R.recognition_limitToLevelId
                FOR JSON PATH
            ) 'levels'
            FROM cognetic_campaigns_recognition R
            WHERE recognition_groupid = group_id
            FOR JSON PATH 
        )'recognitions',
        (
            SELECT rule_name, rule_id
            FROM cognetic_rules_rule RR
            WHERE group_ruleid = RR.rule_id
            FOR JSON PATH
        ) 'rules',
        (
            SELECT model_name, model_id, model_logicalOperator,
            (
                SELECT rule_name, modelRule_ruleid
                FROM cognetic_rules_modelRule MR
                JOIN cognetic_rules_rule RR on RR.rule_id = MR.modelRule_ruleid
                WHERE M.model_id = MR.modelRule_modelid
                FOR JSON PATH
            ) 'model_rules'
            FROM cognetic_rules_model M
            WHERE group_modelid = model_id
            FOR JSON PATH 
        ) 'models'
        FROM cognetic_members_club C
        RIGHT JOIN cognetic_rules_group G on g.group_clubid = c.club_id
        WHERE G.group_clubid = cte.club_id
        FOR JSON PATH
    ) 'groups'
    FROM cte
    FOR JSON PATH, ROOT ('clubs')