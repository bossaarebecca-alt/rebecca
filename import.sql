SET FOREIGN_KEY_CHECKS = 0;

-- ============================================================
-- NETTOYAGE COMPLET
-- ============================================================
DELETE FROM absence;
DELETE FROM personnel_roles;
DELETE FROM personnel;
DELETE FROM groupe;
DELETE FROM service_dsi;
DELETE FROM role;
DELETE FROM jour_ferie;
DELETE FROM rotation_groupe;
DELETE FROM rotation_globale;
DELETE FROM planification;

-- ============================================================
-- ROLES
-- ============================================================
INSERT INTO role (id, nom, description) VALUES
                                            (1, 'ADMIN', 'Administrateur systeme - acces complet'),
                                            (2, 'USER',  'Utilisateur standard - acces lecture/ecriture limite');

-- ============================================================
-- SERVICES DSI
-- ============================================================
INSERT INTO service_dsi (id, nom, description) VALUES
                                                   (1, 'Application',    'Developpement et maintenance des applications metier'),
                                                   (2, 'Infrastructure', 'Gestion des serveurs, reseaux et stockage'),
                                                   (3, 'Exploitation',   'Support technique et supervision 24/7');

-- ============================================================
-- GROUPES (5 groupes existants)
-- ============================================================
INSERT INTO groupe (id, nom, description, service_id) VALUES
                                                          (1, 'Developpeurs',            'Equipe developpement logiciel et web',          1),
                                                          (2, 'DBA',                     'Administration et gestion des bases de donnees', 2),
                                                          (3, 'Administrateurs Reseau',  'Administration reseau et cybersecurite',         2),
                                                          (4, 'Administrateurs Systeme', 'Administration des serveurs et systemes',        2),
                                                          (5, 'Exploitants',             'Exploitation, support et supervision',           3);

-- ============================================================
-- SUPER ADMIN (sans groupe)
-- ============================================================
INSERT INTO personnel (id, nom, prenom, email, telephone, password, est_manager, est_actif, jour_habituel, groupe_id) VALUES
    (1, 'ADMIN', 'Super', 'admin@tfj.com', '0123456789',
     '$2a$12$ihK75alpQ4aBPf0cOWDTsOilupCdUGXuHuekvoiYAHe3Ii5RwCFTC',
     TRUE, TRUE, 'LUNDI', NULL);

INSERT INTO personnel_roles (personnel_id, role_id) VALUES (1, 1), (1, 2);

-- ============================================================
-- SERVICE APPLI (id=1) -> GROUPE 1 : DEVELOPPEURS (4 personnes)
-- ============================================================
-- AKUE Hermann - Developpeur Manager (manager)
INSERT INTO personnel (id, nom, prenom, email, telephone, password, est_manager, est_actif, jour_habituel, groupe_id) VALUES
    (2, 'AKUE', 'Hermann', 'hermann.akue@tfj.com', '0123456701',
     '$2a$12$Sif3JI.eW0gMqZuISf5hiuLGjtevpYWJmQpZZAsJRyICOyA7Fp9V2',
     TRUE, TRUE, 'LUNDI', 1);

-- AFEZOUNON Elom - Developpeur
INSERT INTO personnel (id, nom, prenom, email, telephone, password, est_manager, est_actif, jour_habituel, groupe_id) VALUES
    (3, 'APEZOUMON', 'Elom', 'elom.afezounon@tfj.com', '0123456702',
     '$2a$12$Sif3JI.eW0gMqZuISf5hiuLGjtevpYWJmQpZZAsJRyICOyA7Fp9V2',
     FALSE, TRUE, 'MARDI', 1);

-- KPIZIA Valion - Developpeur
INSERT INTO personnel (id, nom, prenom, email, telephone, password, est_manager, est_actif, jour_habituel, groupe_id) VALUES
    (4, 'KPIZIA', 'Taliou', 'valion.kpizia@tfj.com', '0123456703',
     '$2a$12$Sif3JI.eW0gMqZuISf5hiuLGjtevpYWJmQpZZAsJRyICOyA7Fp9V2',
     FALSE, TRUE, 'MERCREDI', 1);

-- ROYODE Essomina - Developpeur
INSERT INTO personnel (id, nom, prenom, email, telephone, password, est_manager, est_actif, jour_habituel, groupe_id) VALUES
    (5, 'POYODE', 'Essomina', 'essomina.royode@tfj.com', '0123456704',
     '$2a$12$Sif3JI.eW0gMqZuISf5hiuLGjtevpYWJmQpZZAsJRyICOyA7Fp9V2',
     FALSE, TRUE, 'JEUDI', 1);

INSERT INTO personnel_roles (personnel_id, role_id) VALUES (2, 2), (3, 2), (4, 2), (5, 2);

-- ============================================================
-- SERVICE INFRA (id=2) -> GROUPES 2, 3, 4
-- ============================================================

-- GROUPE 2 : DBA (1 personne - Manager DPA)
-- LAYSON Patricine - DPA Manager (manager, solo -> weekend uniquement)
INSERT INTO personnel (id, nom, prenom, email, telephone, password, est_manager, est_actif, jour_habituel, groupe_id) VALUES
    (6, 'LAWSON', 'Paterne', 'patricine.layson@tfj.com', '0123456705',
     '$2a$12$Sif3JI.eW0gMqZuISf5hiuLGjtevpYWJmQpZZAsJRyICOyA7Fp9V2',
     TRUE, TRUE, 'VENDREDI', 2);

INSERT INTO personnel_roles (personnel_id, role_id) VALUES (6, 2);

-- GROUPE 3 : ADMINISTRATEURS RESEAU (1 personne - solo)
-- KPOMADA Mawuli - Admin Reseau (solo -> weekend uniquement)
INSERT INTO personnel (id, nom, prenom, email, telephone, password, est_manager, est_actif, jour_habituel, groupe_id) VALUES
    (7, 'KPOMADA', 'Mawuli', 'mawuli.kpomada@tfj.com', '0123456706',
     '$2a$12$Sif3JI.eW0gMqZuISf5hiuLGjtevpYWJmQpZZAsJRyICOyA7Fp9V2',
     FALSE, TRUE, 'VENDREDI', 3);

INSERT INTO personnel_roles (personnel_id, role_id) VALUES (7, 2);

-- GROUPE 4 : ADMINISTRATEURS SYSTEME (1 personne - solo)
-- TOGBEDJI Clement - Admin Systeme (solo -> weekend uniquement)
INSERT INTO personnel (id, nom, prenom, email, telephone, password, est_manager, est_actif, jour_habituel, groupe_id) VALUES
    (8, 'TOGBEDJI', 'Clement', 'clement.togbedji@tfj.com', '0123456707',
     '$2a$12$Sif3JI.eW0gMqZuISf5hiuLGjtevpYWJmQpZZAsJRyICOyA7Fp9V2',
     FALSE, TRUE, 'VENDREDI', 4);

INSERT INTO personnel_roles (personnel_id, role_id) VALUES (8, 2);

-- ============================================================
-- SERVICE EXPLOI (id=3) -> GROUPE 5 : EXPLOITANTS (3 personnes)
-- ============================================================
-- DAOUDA Josifon - Exploitation Manager (manager)
INSERT INTO personnel (id, nom, prenom, email, telephone, password, est_manager, est_actif, jour_habituel, groupe_id) VALUES
    (9, 'DAOUDA', 'Issifou', 'josifon.daouda@tfj.com', '0123456708',
     '$2a$12$Sif3JI.eW0gMqZuISf5hiuLGjtevpYWJmQpZZAsJRyICOyA7Fp9V2',
     TRUE, TRUE, 'LUNDI', 5);

-- DEGBE Alfred - Exploitation
INSERT INTO personnel (id, nom, prenom, email, telephone, password, est_manager, est_actif, jour_habituel, groupe_id) VALUES
    (10, 'DEGBE', 'Alfred', 'alfred.degbe@tfj.com', '0123456709',
     '$2a$12$Sif3JI.eW0gMqZuISf5hiuLGjtevpYWJmQpZZAsJRyICOyA7Fp9V2',
     FALSE, TRUE, 'MARDI', 5);

-- TIDJATA Benedicta - Exploitation
INSERT INTO personnel (id, nom, prenom, email, telephone, password, est_manager, est_actif, jour_habituel, groupe_id) VALUES
    (11, 'TIDATAO', 'Benedicta', 'benedicta.tidjata@tfj.com', '0123456710',
     '$2a$12$Sif3JI.eW0gMqZuISf5hiuLGjtevpYWJmQpZZAsJRyICOyA7Fp9V2',
     FALSE, TRUE, 'JEUDI', 5);

INSERT INTO personnel_roles (personnel_id, role_id) VALUES (9, 2), (10, 2), (11, 2);

-- ============================================================
-- ABSENCES (exemples)
-- ============================================================
INSERT INTO absence (id, personnel_id, date_debut, date_fin, type, est_demi_journee_matin, est_demi_journee_apres_midi, commentaire) VALUES
                                                                                                                                         (1, 3, '2026-05-04', '2026-05-08', 'CONGE_ANNUEL',  FALSE, FALSE, 'Conges annuels - Elom'),
                                                                                                                                         (2, 7, '2026-05-05', '2026-05-05', 'CONGE_MALADIE', TRUE,  FALSE, 'Arret maladie - Mawuli');

-- ============================================================
-- JOURS FERIES (mai 2026)
-- ============================================================
INSERT INTO jour_ferie (date, nom, est_jour_ferie_legal, est_demi_journee, est_matin) VALUES
                                                                                          ('2026-05-01', 'Fete du Travail',    TRUE, FALSE, NULL),
                                                                                          ('2026-05-08', 'Victoire 1945',      TRUE, FALSE, NULL),
                                                                                          ('2026-05-14', 'Ascension',          TRUE, FALSE, NULL),
                                                                                          ('2026-05-25', 'Lundi de Pentecote', TRUE, TRUE,  TRUE);

-- ============================================================
-- INITIALISATION ROTATIONS (optionnel mais recommande)
-- ============================================================
INSERT INTO rotation_globale (id, index_global_suivant, cycle_actuel, dernier_groupe_id, derniere_mise_a_jour)
VALUES (1, 0, 0, NULL, NOW())
    ON DUPLICATE KEY UPDATE
                         index_global_suivant = VALUES(index_global_suivant),
                         cycle_actuel = VALUES(cycle_actuel),
                         dernier_groupe_id = VALUES(dernier_groupe_id),
                         derniere_mise_a_jour = VALUES(derniere_mise_a_jour);

SET FOREIGN_KEY_CHECKS = 1;