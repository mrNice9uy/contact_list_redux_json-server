import { connect } from "react-redux";
import { bindActionCreators } from "redux";

//import { getContacts, setContacts } from "../actions/contacts";
import * as contactsActions from "../actions/contacts";
import ContactList from "../../components/Contacts/ContactList";
import App from "../../App";

const mapStateToProps = (state) => ({
  contactList: state,
});

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(contactsActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactList);

/*export default connect(mapStateToProps, {
  getContacts,
  setContacts
})(ContactList);*/
