const sql={
    selectWithoutOwners:"select bin_to_uuid(p.id) id,p.name,p.age,p.animal from pets p left join owner o on p.owner_id=o.id where o.id is null",
    selectWithOwners:"select bin_to_uuid(p.id) id,p.name,p.age,p.animal from pets p inner join owner o on p.owner_id=o.id",
    selectOwners:"select bin_to_uuid(o.id) id,o.name from owner o",
    selectByOwner:"select bin_to_uuid(id) id,name,age,animal from pets where owner_id like uuid_to_bin(?)",
    insertPet:"insert into pets(id,name,age,animal,owner_id) values(uuid_to_bin(uuid()),?,?,?,null)",
    insertOwner:"insert into owner(id,name) values(uuid_to_bin(uuid()),?)",
    updatePet:"update pets set name=?,age=?,animal=? where id like uuid_to_bin(?)",
    deletePet:"delete from pets where id like uuid_to_bin(?)",
    adoptPet:"update pets set owner_id=uuid_to_bin(?) where id like uuid_to_bin(?)"
};

module.exports=sql;