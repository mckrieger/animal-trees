import React from 'react';
import {useState} from 'react';
import './index.css';
import data from './data.json';

export default function Tree() {
  const [tree, setTree] = useState(data);
  const [nextId, setNextId] = useState(8);

  const addNode = (parentId, name) => {
    const clone = structuredClone(tree);
    const parent = findNodeById(clone, parentId);
    if (parent != null && parent.children){
      parent.children.push({id: nextId, name, children: []});
      setTree(clone);
      setNextId(prevId => prevId + 1);
    }
  }

  const findNodeById = (object, id) => {
    const node = checkNode(object, id);
    if (node == null) {
      console.error("Error finding node with id: " + id);
    }
    return node;
  }

  const checkNode = (node, id) => {
    var result = null;
    if (node.id === id) {
      return node;
    }
    else if (node.children && node.children.length > 0) {
      for (var i = 0; i < node.children.length; i++) {
        result = checkNode(node.children[i], id);
        if (result) {
          break;
        }
      }
    }
    return result;
  } 

  return (
      <TreeNode key={tree.id} node={tree} depth={0} addNode={addNode}/>
  );
}

const TreeNode = ({node, depth, addNode}) => {
  const hasChildren = node.children && node.children.length > 0;
  return (
    <ul>
      <li style={{marginLeft: `${depth * 50}px`}}>{node.name}
        <NodeInput addNode={addNode} nodeId={node.id}/>
      </li>
      {hasChildren && (
        <>
        {node.children.map((child) => (
          <TreeNode key={child.id} node={child} depth={depth + 1} addNode={addNode}/>
        ))}
        </>
      )}
    </ul>
  );
};

const NodeInput = ({addNode, nodeId}) => {
  const [text, setText] = useState('');

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && text.trim() !== '') {
      addNode(nodeId, text);
      setText('');
    }
  }
  return (
    <>
      <input
        value={text}
        onChange={e => setText(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </>
  )
}