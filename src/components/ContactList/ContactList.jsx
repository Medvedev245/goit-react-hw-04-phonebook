import PropTypes from 'prop-types';
import { List, Item, Button } from './ContactList.styled';

export const ContactList = ({ contacts, onDelete }) => {
  const el = contacts;
  return (
    <List>
      {el.map(({ id, name, number }) => (
        <Item key={id}>
          {name}: {number}
          <Button
            onClick={() => {
              onDelete(id);
            }}
          >
            Delete
          </Button>
        </Item>
      ))}
    </List>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
};
