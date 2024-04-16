import os

def enregistrer_noms_fichiers(dossier_source, fichier_sortie):
    with open(fichier_sortie, 'w') as f:
        for dossier, sous_dossiers, fichiers in os.walk(dossier_source):
            for fichier in fichiers:
                nom_fichier = os.path.join(dossier, fichier)
                nom_dossier_destination = os.path.relpath(dossier, dossier_source)
                f.write(f"{nom_fichier}\n")

# Obtenez le chemin du répertoire du script
repertoire_script = os.path.dirname(os.path.abspath(__file__))

# Utilisation : 
dossier_source = repertoire_script  # Le répertoire du script est le dossier source
fichier_sortie = os.path.join(repertoire_script, "noms_fichiers.txt")

enregistrer_noms_fichiers(dossier_source, fichier_sortie)
