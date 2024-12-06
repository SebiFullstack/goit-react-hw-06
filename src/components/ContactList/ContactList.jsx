import { useSelector } from "react-redux";
import Contact from "../Contact/Contact";
import s from "./ContactList.module.css";
import { selectContacts } from "../../redux/contactsSlice";
import { selectNameFilter } from "../../redux/filtersSlice";

const ContactList = () => {
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectNameFilter);
  if (!contacts) return;
  const filteredData = contacts.filter((item) =>
    item.name.toLowerCase().includes(filter)
  );

  return (
    <ul className={s.contact_list}>
      {filteredData.map((contact) => {
        return (
          <li className={s.contact_item} key={contact.id}>
            <Contact
              name={contact.name}
              number={contact.number}
              id={contact.id}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default ContactList;