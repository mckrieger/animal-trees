import React from 'react';
import './index.css';
import data from './data.json';

export default function Tree() {
    return (
    <>
        <TreeNode key={data.id} node={data} depth={0}/>
    </>
  );
}

const TreeNode = ({node, depth}) => {
  const hasChildren = node.children && node.children.length > 0;
  return (
    <>
      <p style={{marginLeft: `${depth * 50}px`}}>{node.name}</p>
      {hasChildren && (
        <>
        {node.children.map((child) => (
          <TreeNode key={child.id} node={child} depth={depth + 1}/>
        ))}
        </>
      )}
    </>
  );
};